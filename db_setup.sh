#!/bin/bash

MYSQL=`which mysql`

Q1="CREATE DATABASE IF NOT EXISTS intelsecurity;"
Q2="GRANT USAGE ON *.* TO foo@localhost IDENTIFIED BY 'password';"
Q3="GRANT ALL PRIVILEGES ON intelsecurity.* TO foo@localhost;"
Q4="FLUSH PRIVILEGES;"
SQL1="${Q1}${Q2}${Q3}${Q4}"
  
$MYSQL -uroot -p -e "$SQL1"

Q5="USE intelsecurity;"
Q6="CREATE TABLE malware(MD5 VARCHAR(34) NOT NULL, ClassificationName VARCHAR(20) NOT NULL, ClassificationType VARCHAR(20) NOT NULL, Size INT(15) NOT NULL, FileType VARCHAR(10) NOT NULL, PRIMARY KEY(MD5));"

SQL2="${Q5}${Q6}"

$MYSQL -u foo --password='password' -e "$SQL2"
