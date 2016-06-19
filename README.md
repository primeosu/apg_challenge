# Overview
This application was designed for demonstration purproses only. A production application should utilize a more robust solution such as the latest stable version of [ruby (2.3.1)](https://www.ruby-lang.org/en/downloads/), [nginx](https://www.nginx.com), and [passenger](https://www.phusionpassenger.com/).

## Setup
Tested with the following configuration

 * CentOS 7.2.1511

### Install Prerequisite Packages
 * `yum install -y git`
 * Checkout Repo: `git clone git@github.com:sstovall/apg_challenge.git`
 * `cd apg_challenge && ./setup-centos7.sh`

### Start WebApp
 * `rails s -b 0.0.0.0`

 * (optional) `sudo rails -s -b 0.0.0.0 -p 80`
  * root privilege required to bind to tcp/80

### Access via Web Browser
 * Access via web browser `http://<server_ip>:3000/`

# Threat Intelligence WebApp

## Reset Database
 * stop server
 * `rake db:drop`
 * `rake db:setup`
 * start server

## Features

###
### Show Threat Database

### Display Threat Statistics


Features
--------
### Import Malware Data

[![import csv](https://github.com/sstovall/apg_challenge/raw/master/screenshots/import-malware-data.png)](https://github.com/sstovall/apg_challenge/raw/master/screenshots/import-malware-data.png)

### Attach File to Import

[![import csv](https://github.com/sstovall/apg_challenge/raw/master/screenshots/attach-file-to-import.png)](https://github.com/sstovall/apg_challenge/raw/master/screenshots/attach-file-to-import.png)

### Threats by Classification Type

[![import csv](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threats-by-classification-type.png)](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threats-by-classification-type.png)

### Threat Database

[![import csv](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threat-database.png)](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threat-database.png)

### Threat Statistics

[![import csv](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threat-statistics.png)](https://github.com/sstovall/apg_challenge/raw/master/screenshots/threat-statistics.png)
