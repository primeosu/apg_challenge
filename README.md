## Installation Instructions
1. First, install the latest distribution of Python 2.7.
1. Next, use easy_install or pip to install the following dependencies: flask, flask-bootstrap, and werkzeug (pip install flask flask-bootstrap werkzeug).
1. Next, run AppParser.py (python AppParser.py) to start the application.
1. Finally, navigate to 127.0.0.1:5000 to use the application.


## Project Description
Imagine that Intel Security has just acquired a new security company.  Unfortunately, the company has never stored their data in a database and instead uses plain text files.  We need to create a way for the new subsidiary to import their malware data into a database.  Your task is to create a web interface that accepts file uploads, normalizes the data, and then stores it in a relational database - design is up to you.

Here's what this web-based application does:

1. Accepts (via a form) a CSV file with the following columns: MD5, ClassificationName, ClassificationType, Size, FileType.  You can assume the columns will always be in that order, that there will always be data in each column, that there will always be a header line, and that there will never be a duplicate MD5.  An example input file named example_input.csv is included in this repo.
1. Parses the given file, normalizes the data, and stores the information in a relational database.
1. After each upload, displays the total amount of each different ClassificationType in the database.
