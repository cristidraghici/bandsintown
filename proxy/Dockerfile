FROM php:8.1-apache

ENV COMPOSER_ALLOW_SUPERUSER 1

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    && docker-php-ext-install zip

# Set the working directory
WORKDIR /app

# Copy composer files and install dependencies
COPY composer.json composer.lock /app/
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer update && composer install --prefer-dist --no-interaction --no-progress --no-scripts --optimize-autoloader 

# Copy the rest of the application
COPY . /app

# Expose port
EXPOSE 8080

# Run PHP server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/app"]
