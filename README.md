# Intel Security Programming Challenge

Scroll down to the original challenge prompt section to view the instructions and what the application is expected to do. Thanks so much for taking your time to check out this application and hopefully get it working. If for some reason these instructions
do not work, you can always view the live demo here: intel-apg-challenge.herokuapp.com

I want to say that to date, this is one of my favorite projects/type of projects to work on and I hope to really learn more in this
web application, full-stack making, headache inducing industry.

Thanks :D

## Local Installation

Feel free to skip over the node section if it's already installed

#### I. Install/Configure postgres
   1. remove existing postgres (optional)
      - command: sudo apt-get --purge remove postgresql\*
   2. install postgres
      - command: sudo apt-get install postgresql-9.4
   3. test connection to psql terminal to work with postgres
      - command: sudo -u postgres psql postgres
      - you use this command every time you want to use
        the command linke to work with postgres
      - usually you can type psql to get into the terminal
        but only after you set roles/admin rights
      - type \q to quit
   4. alter default user's ('postgres') password
      - in the psql terminal: ALTER USER Postgres WITH PASSWORD 'apg-challenge';
      - this makes the password for account, postgres, to apg-challenge
   5. augment database connection method
      - command: sudo [emacs|vi|editorOfYourCHoice] /etc/postgresql/9.4/main/pg_hba.conf
      - change this line: local   all             postgres                                peer
        to this line:     local   all             postgres                                md5
      - connection problems would occur right here if you didn't change peer to md5
   6. restart server
      - command: /etc/init.d/postgresql restart
      
#### II. Create Table in postgres database

   1. log into psql

      - command: sudo -u postgres psql postgres 

   2. create table

      - create table malware1 ("MD5" text unique, "ClassificationName" text, "ClassificationType" text, "Size" integer, "FileType" text);

   ##### Useful Commands:
   
   * \list						 -> displays all databases
   * \dt+	       		   	       		    	 -> list all tables in database
   * \d+ [tableName]	   	       	    	    	 -> displays structure of table, "tableName"
   * /etc/init.d/postgresql [status|start|stop|restart]    -> check status, start, stop, restart database

   ##### Note:

* the connection string in the nodejs code is: postgres://postgres:apg-challenge@localhost:5432/postgres
 * the code is told to connect to either the live database hosted by heroku or the local database

#### III. Install Node

   1. install

      - follow this guide: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

#### IV. Set Up Working Directory/start application server/use application

   1. copy from repo

      - command: git clone https://github.com/Pplum09/apg_challenge.git

   2. install dependencies

      - cd into working directory apg_challenge
      - command: npm install

   3. start server

      - command: npm start

   4. use application

      - in the browser of your choice (please use chrome), navigate to localhost:3000
# Usage

1. click on the "Upload CSV" button and select a .csv file from you computer
    * the table columns are ("MD5" text unique, "ClassificationName" text, "ClassificationType" text, "Size" integer, "FileType" text)
    * note that MD5 is unique, and if you try to upload a file containing a row with a duplicate MD5, that query will just fail
2. click on the "Delete All Rows" button to delete all rows
3. click on the "Source" button to open a new tab to the github repository containing this project

# Original Challenge Prompt

Please complete the following programming challenge.  It is used to better assess a candidate's software development skills.   You have as much time as you'd like (though we ask that you not spend more than a few hours) and may use any programming language or framework you'd like.  Feel free to contact the original sender if you have any questions.

### Submission Instructions
1. First, fork this project on github.  You will need to create an account if you don't already have one.
1. Next, complete the project as described below within your fork.
1. Finally, push all of your changes to your fork on github and submit a pull request.

### Project Description
Imagine that Intel Security has just acquired a new security company.  Unfortunately, the company has never stored their data in a database and instead uses plain text files.  We need to create a way for the new subsidiary to import their malware data into a database.  Your task is to create a web interface that accepts file uploads, normalizes the data, and then stores it in a relational database - design is up to you.

Here's what your web-based application must do:

1. Your app must accept (via a form) a CSV file with the following columns: MD5, ClassificationName, ClassificationType, Size, FileType.  You can assume the columns will always be in that order, that there will always be data in each column, that there will always be a header line, and that the CSVs could potentially have duplicate MD5s.  An example input file named example_input.csv is included in this repo.
1. Your app must parse the given file, normalize the data, and store the information in a relational database.
1. After each upload, your application should display the total amount of each different ClassificationType in the database.  So for example: trojan -> 3, pup -> 2, unknown -> 1, etc.

Your application does not need to:

1. be written with any particular language or framework
1. be aesthetically pleasing (bonus points if it does, extra bonus points for using Bootstrap)

Your application should be easy to set up and should run on Linux.  It also should not require any for-pay software.  If you are unfamiliar with what an MD5 is, it may be helpful to read: https://en.wikipedia.org/wiki/MD5

### Evaluation
Evaluation of your submission will be based on the following criteria:

1. Did your application fulfill the basic requirements?
1. Did you document the method for setting up and running your application?
1. Did you follow the instructions for submission?
