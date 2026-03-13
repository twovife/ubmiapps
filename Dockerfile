FROM php:8.2-cli-alpine AS php-deps

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress --no-scripts

COPY . .

# JANGAN jalankan artisan di build stage
# Hapus baris ini:
# RUN php artisan package:discover
# RUN composer dump-autoload --optimize

# Bersihkan cache Laravel agar tidak ikut ke image
RUN rm -rf bootstrap/cache/*

# ---------- frontend ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY --from=php-deps /app /app

RUN npm ci
RUN npm run build

# ---------- final ----------
FROM php:8.2-fpm-alpine

COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/zz-app.conf

RUN apk add --no-cache \
  bash icu-dev oniguruma-dev libzip-dev zip unzip $PHPIZE_DEPS \
  && docker-php-ext-install pdo_mysql intl mbstring zip opcache \
  && apk del $PHPIZE_DEPS

COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini

WORKDIR /var/www/html

COPY --from=php-deps /app /var/www/html
COPY --from=frontend-builder /app/public/build /var/www/html/public/build

# ← TAMBAHKAN DI SINI
RUN rm -rf bootstrap/cache/* \
  && rm -rf storage/framework/cache/*

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh



RUN mkdir -p storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R 775 storage bootstrap/cache

USER www-data

ENTRYPOINT ["/entrypoint.sh"]


