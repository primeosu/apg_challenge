#!/usr/bin/env bash

sudo su -c "echo 'deb http://packages.dotdeb.org jessie all' >> /etc/apt/sources.list"
sudo su -c "echo 'deb-src http://packages.dotdeb.org jessie all' >> /etc/apt/sources.list"

wget https://www.dotdeb.org/dotdeb.gpg
sudo apt-key add dotdeb.gpg
rm -f dotdeb.gpg

sudo apt-get update

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
sudo apt-get install -y mysql-server curl build-essential
sudo apt-get install -y apache2 php7.0 php7.0-common libapache2-mod-php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-mbstring php7.0-readline php7.0-opcache php7.0-dev php7.0-cli php7.0-xml php7.0-zip

sudo apt-get install -y redis-server

sudo a2enmod rewrite

cat /var/config_files/site.conf > /etc/apache2/sites-available/000-default.conf

sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/my.cnf

echo "DROP DATABASE IF EXISTS test" | mysql -uroot -proot
echo "CREATE USER 'devdb'@'localhost' IDENTIFIED BY 'devdb'" | mysql -uroot -proot;
echo "CREATE USER 'devroot'@'%' IDENTIFIED BY 'devroot'" | mysql -uroot -proot;
echo "CREATE DATABASE devdb" | mysql -uroot -proot;
echo "GRANT ALL ON devdb.* TO 'devdb'@'localhost'" | mysql -uroot -proot;
echo "GRANT ALL ON *.* TO 'devroot'@'%'" WITH GRANT OPTION | mysql -uroot -proot;

sudo service apache2 restart
sudo service mysql restart

php -r "readfile('https://getcomposer.org/installer');" > composer-setup.php
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/bin/composer

#pushd;
cd /srv/web
composer install

php artisan migrate
#popd;