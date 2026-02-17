FROM php:8.2-cli-alpine AS php-deps

# install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./


RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --no-scripts

COPY . .

# Pastikan folder yang Laravel butuh ada
RUN mkdir -p bootstrap/cache \
  && chmod -R 775 bootstrap/cache


RUN php artisan package:discover --ansi || true
RUN composer dump-autoload --optimize



# 2) Frontend build (Vite)
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Ambil source + vendor dari stage php-deps
COPY --from=php-deps /app /app


RUN npm ci

# Build assets
RUN npm run build

FROM php:8.2-fpm-alpine

# Install system deps + build deps untuk PHP extensions
RUN apk add --no-cache \
  bash \
  icu-dev \
  oniguruma-dev \
  libzip-dev \
  zip \
  unzip \
  $PHPIZE_DEPS \
  && docker-php-ext-install \
  pdo_mysql \
  intl \
  mbstring \
  zip \
  opcache \
  && apk del $PHPIZE_DEPS

# PHP config
COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html

# Copy app + vendor
COPY --from=php-deps /app /var/www/html

# Copy hasil build npm
COPY --from=frontend-builder /app/public/build /var/www/html/public/build

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Siapkan folder minimum (fallback kalau jalan tanpa volume)
RUN mkdir -p storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

# Jalankan sebagai user non-root
USER www-data



ENTRYPOINT ["/entrypoint.sh"]
