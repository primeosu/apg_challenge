# Intel Security Programming Challenge
To set up the program you must first have mysql installed. Depening on your Linux distro the command for installing it may vary, but in most RedHat distros you can enter `sudo yum install mysql -y`

Now all you need to do is run the setup script by typing the following:
`sudo ./setup.sh`

The script automatically builds the mysql table, adds the user, installs all node dependencies, starts the server, and opens the webpage.
If you do not have the command `open` installed in your terminal than you will have to open index.html manually or using another command like `google-chrome`

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
