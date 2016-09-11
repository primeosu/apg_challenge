# CSV Parser

The project is part of [Intel Security Programming Challenge](https://github.com/primeosu/apg_challenge).
**It is not intended to be a general csv parser.**

The application takes in a csv file with following headers : 

MD5, ClassificationName, ClassificationType, Size, FileType


## Install

Have a web server (e.g. Apache) and mysql running. Installing [XAMPP](https://www.apachefriends.org/index.html) is recommended. Clone the repo to the server directory and navigate to http://localhost/path-to-files in your browser.

The script assumes that mysql is running, *demo* database exists, and *Malware_d* table exists.

```sql
CREATE TABLE Malware_d (
	md5 varchar(35) NOT NULL,   
	ClassificationName varchar(20) NOT NULL, 
	ClassificationType varchar(20) NOT NULL,   
	Size int(11) NOT NULL,   
	FileType varchar(20) NOT NULL,   
	PRIMARY KEY (md5) 
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Open handler.php and change the database settings.
```
define("HOST", "localhost");
define("USER", "root");
define("PASS", "root");
```
## Uses

Users can simply drag & drop a csv file to the form or click on the form to choose a file. 

The table that displays the total amount of different ClassificationType will be updated automatically if the correctly csv file is given.


## Libraries Used

Several libraries were used to speed up the development process including :

- JQuery
- Dropzone
- Bootstrap

No additional frameworks were used, since the application serves a very simple purpose.


## Other
The uploaded csv file does not get saved in the server. The information is parsed and stored in the database but not the file itself.

This project is for demonstration purpose only.


