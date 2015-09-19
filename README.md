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




## Setup

To setup and start the application follow the steps below. You can also find a live version of it running at [54.69.84.138:8421/apg_challenge](http://54.69.84.138:8421/apg_challenge)

0. Clone in to this repository

  ```
  ➜ git clone https://github.com/chris--young/apg_challenge.git
  ➜ cd apg_challenge
  ```

1. Install curl if you don't already have it.

  ```
  ➜ sudo apt-get update
  ➜ sudo apt-get curl
  ```

2. Install NVM and Node.js v4.0.0. This project uses ES6 so we must use the latest version of Node.

  ```
  ➜ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
  ➜ nvm install 4.0.0
  ```

3. Install MySQL and setup the schema. MySQL will ask you to set a password for the root user during the installation process. If you choose to set one remember it for later when we set the APG_USER and APG_PASS environmental variables. A good password should be used in a real production environment.

  ```
  ➜ sudo apt-get update
  ➜ sudo apt-get install mysql-server mysql-client

  # If you did not set a root password use this command,
  ➜ mysql -u root < schema.sql

  # else use this command.
  ➜ mysql -u root -p < schema.sql
  ```

4. Install frontend build tools. Bower is only needed for development, you can skip it if you don't plan on adding new code to the frontend.

  ```
  ➜ npm install --global bower
  ➜ npm install --global gulp
  ```

5. Install npm modules

  ```
  ➜ npm install
  ➜ cd public
  ➜ npm install
  ```

6. Build the frontend app

  ```
  ➜ gulp
  ```

7. Set database credential environmental variables if you set a password for the root user or want to use a user other than root. If you did not set a password for root then you can skip this step.

  ```
  ➜ export APG_USER="root"
  ➜ export APG_PASS=""
  ```

8. Finally, start the server.

  ```
  ➜ cd ..
  ➜ ./start
  ```
