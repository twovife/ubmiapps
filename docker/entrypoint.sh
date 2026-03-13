#!/bin/sh
set -e

echo "Running Laravel startup tasks..."

php artisan package:discover --ansi || true
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache

exec php-fpm
