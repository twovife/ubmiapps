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
# 3) Runtime (PHP-FPM only)
# =========================
FROM php:8.2-fpm-alpine

# Install system deps & PHP extensions
RUN apk add --no-cache \
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

# Copy PHP config
COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html

# Copy app + vendor dari php-deps
COPY --from=php-deps /app /var/www/html

# Copy hasil build frontend (Vite)
COPY --from=frontend-builder /app/public/build /var/www/html/public/build

# Buat folder yang Laravel butuh + set permission
RUN mkdir -p storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache


USER www-data

CMD ["php-fpm"]
