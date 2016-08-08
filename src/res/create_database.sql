-- delete the database if it exists
DROP DATABASE IF EXISTS challenge;

-- create challenge database
CREATE DATABASE challenge;

-- drop user 'cu' if it exists
DROP USER IF EXISTS 'cu'@'localhost';

-- create user 'cu' with password '1234'
CREATE USER 'cu'@'localhost' IDENTIFIED BY '1234';

-- verify the user was created
select host, user, authentication_string from mysql.user;

-- verify the user has no privileges
SELECT host, user, select_priv, insert_priv, update_priv, delete_priv, create_priv, alter_priv, authentication_string FROM mysql.user WHERE user='cu';

-- grant all privileges to the user
GRANT ALL PRIVILEGES ON *.* TO 'cu'@'localhost';

-- verifiy the user has all privileges
SELECT host, user, select_priv, insert_priv, update_priv, delete_priv, create_priv, alter_priv, authentication_string FROM mysql.user WHERE user='cu';
