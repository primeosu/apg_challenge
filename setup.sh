#!/bin/bash

mysql < createuser.sql
mysql -u chris --password="chris" < threats-1.0.sql
npm install
node js/server.js
open index.html
