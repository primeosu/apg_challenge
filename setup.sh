#!/bin/bash

mysql < mysql/createuser.sql
mysql -u chris --password="chris" < mysql/threats-1.0.sql
npm install
node js/server.js
