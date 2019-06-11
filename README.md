# Demo

https://apg-challenge.herokuapp.com/

# Enviroment
-  Tested in both Windows 7 and MacOS High Sierra 
-  Node v10.9.0 and the AdonisJS Framework
-  Postgres 11.2
-  React 16.8.6

# Setup

Install AdonisJs CLI globally :

    npm i -g @adonisjs/cli

Install Server dependencies :

    npm install
    
Create a .env file at the root directory with the following:

    HOST=localhost
    PORT=3333
    NODE_ENV=development
    APP_URL=http://${HOST}:${PORT}
    CACHE_VIEWS=false
    APP_KEY=htbLFNPcTijD2F5gYbMflhY9JRaDvlYl
    DB_CONNECTION=pg
    DB_HOST=127.0.0.1
    DB_PORT=[your DB port, usually 5432 ] 
    DB_USER=[your DB user, usually postgres]
    DB_PASSWORD=[your DB passowrd]
    DB_DATABASE=[your DB name]
    SESSION_DRIVER=cookie
    HASH_DRIVER=bcrypt

Install React App dependencies :

    cd front
    npm install

# Start

Run the following to create the Postgres Malware table :

    adonis migration:run

Run the following command to start the HTTP server :

    adonis serve --dev

Runs the React app in development mode :

    cd front
    npm start

Then you can access to the React App using :

    http://localhost:3000/


# Intel Security Programming Challenge
Please complete the following programming challenge.  It is used to better assess a candidate's software development skills.   You have as much time as you'd like (though we ask that you not spend more than a few hours) and may use any programming language or framework you'd like.  Feel free to contact the original sender if you have any questions.

## Submission Instructions
1. First, fork this project on github.  You will need to create an account if you don't already have one.
1. Next, complete the project as described below within your fork.
1. Finally, push all of your changes to your fork on github and submit a pull request.

## Project Description
Imagine that Intel Security has just acquired a new security company.  Unfortunately, the company has never stored their data in a database and instead uses plain text files.  We need to create a way for the new subsidiary to import their malware data into a database.  Your task is to create a web interface that accepts file uploads, normalizes the data, and then stores it in a relational database - design is up to you.

Here's what your web-based application must do:

1. Your app must accept (via a form) a CSV file with the following columns: MD5, ClassificationName, ClassificationType, Size, FileType.  You can assume the columns will always be in that order, that there will always be data in each column, that there will always be a header line, and that the CSVs could potentially have duplicate MD5s.  An example input file named example_input.csv is included in this repo.
1. Your app must parse the given file, normalize the data, and store the information in a relational database.
1. After each upload, your application should display the total amount of each different ClassificationType in the database.  So for example: trojan -> 3, pup -> 2, unknown -> 1, etc.

Your application does not need to:

1. be written with any particular language or framework
1. be aesthetically pleasing (bonus points if it does, extra bonus points for using Bootstrap)

Your application should be easy to set up and should run on Linux.  It also should not require any for-pay software.  If you are unfamiliar with what an MD5 is, it may be helpful to read: https://en.wikipedia.org/wiki/MD5

## Evaluation
Evaluation of your submission will be based on the following criteria:

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
