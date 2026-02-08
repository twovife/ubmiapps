# =========================
# 1) PHP deps (Composer)
# =========================
FROM composer:2 AS php-deps

WORKDIR /app

# Copy composer files dulu untuk cache layer
COPY composer.json composer.lock ./

# Install deps TANPA menjalankan script Laravel
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --no-scripts

# Copy seluruh source
COPY . .

# Jalankan script Laravel sekarang (setelah artisan ada)
RUN php artisan package:discover --ansi || true
RUN composer dump-autoload --optimize


# =========================
# 2) Frontend build (Vite)
# =========================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy source + vendor dari stage php-deps
COPY --from=php-deps /app /app

# Install frontend deps
RUN npm ci

# Build assets (butuh vendor karena Ziggy)
RUN npm run build


# =========================
# 3) Runtime (Nginx + PHP-FPM)
# =========================
FROM php:8.2-fpm-alpine AS runtime

# Install system deps & PHP extensions
RUN apk add --no-cache \
  nginx \
  bash \
  icu-dev \
  oniguruma-dev \
  libzip-dev \
  zip \
  unzip \
  && docker-php-ext-install \
  pdo_mysql \
  intl \
  mbstring \
  zip \
  opcache

# Copy PHP & Nginx config
COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/site.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

# Copy app + vendor dari php-deps
COPY --from=php-deps /app /var/www/html

# Copy hasil build frontend (Vite)
COPY --from=frontend-builder /app/public/build /var/www/html/public/build

# Set permission
RUN chown -R www-data:www-data storage bootstrap/cache

RUN mkdir -p storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache


EXPOSE 80

# Start PHP-FPM + Nginx
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
