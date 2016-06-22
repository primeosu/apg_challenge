# MalStash
MalStash is a web application that allows users to store their malware data files (CSV) to an online database. The application also provides a table as a visual to provide overall information about each malware classification type that is stored.

### Demo
[A demo of this project can be found here](http://192.241.199.180:3000)


### Tech Stack
- **Platform:** Node.js
- **Framework**: Express.js
- **Template Engine**: Handlebars
- **CSS Framework**: Bootstrap
- **Database**: MySQL

# Setup

These setup instructions are for (and have been tested on) Ubuntu 14.04.
Instructions may vary between distros.

## Install Dependencies

### Installing MySQL
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo mysql_install_db
```

### Installing Node.js and npm
```bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y build-essential

sudo apt-get install npm
```

### Installing Node Modules
Before you run the project, you will need to install all of its modules, using the following command:
```
npm install
```

## Setup Database
A file named db_setup.sh is provided to help setup the database, tables, and create a user with privileges.

Run the file with the following command:
```bash
sh db_setup.sh
```

The app accesses this database information (host/user/password) through environment variables. These environment variables are assigned, and can be found in the included .env file. Feel free to make changes to this file if needed.

## Run the Project
To run the project, run the following command:
```
nodejs server.js
```
or (depending on your distro)
```
node server.js
```
The server will be listening on port 3000 by default.


=======================================

# Intel Security Programming Challenge
Please complete the following programming challenge.  It is used to better assess a candidate's software development skills.   You have as much time as you'd like (though we ask that you not spend more than a few hours) and may use any programming language or framework you'd like.  Feel free to contact the original sender if you have any questions.

## Submission Instructions
1. First, fork this project on github.  You will need to create an account if you don't already have one.
1. Next, complete the project as described below within your fork.
1. Finally, push all of your changes to your fork on github and submit a pull request.

## Project Description
Imagine that Intel Security has just acquired a new security company.  Unfortunately, the company has never stored their data in a database and instead uses plain text files.  We need to create a way for the new subsidiary to import their malware data into a database.  Your task is to create a web interface that accepts file uploads, normalizes the data, and then stores it in a relational database - design is up to you.

Here's what your web-based application must do:

1. Your app must accept (via a form) a CSV file with the following columns: MD5, ClassificationName, ClassificationType, Size, FileType.  You can assume the columns will always be in that order, that there will always be data in each column, that there will always be a header line, and that there will never be a duplicate MD5.  An example input file named example_input.csv is included in this repo.
1. Your app must parse the given file, normalize the data, and store the information in a relational database.
1. After each upload, your application should display the total amount of each different ClassificationType in the database.

Your application does not need to:

1. be written with any particular language or framework
1. be aesthetically pleasing (bonus points if it does, extra bonus points for using Bootstrap)

Your application should be easy to set up and should run on Linux.  It also should not require any for-pay software.

## Evaluation
Evaluation of your submission will be based on the following criteria:

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
