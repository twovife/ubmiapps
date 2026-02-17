#!/bin/sh
set -e

echo "Running Laravel startup tasks..."

php artisan config:clear || true
php artisan config:cache || true
php artisan route:cache || true
php artisan view:clear || true

exec php-fpm
