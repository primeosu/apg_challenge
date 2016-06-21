# CSV Importr
https://csvimportr.herokuapp.com/
CSV Importr allows plain text csv files, that include malware data, to be imported into a database and displayed in a table format. Upon import, a column chart will update with the total amount of each different classification type.

# Technologies used:
* Ruby on Rails Version 4.2.6
* Bootstrap CSS & Javascript CDNs
* PostgreSQL
* Rails CSV Library
* Chartkick Ruby Gem (for column chart)

## How to use this app:
1. CSV files should only include the following columns: md5, classificationname,  classificationtype, size, filetype (**column header must be formatted in this manner, all lowercase** see "winisha.csv" as an example)
2. Select "Choose File" to import file from your PC
3. Select "Import", data will be parsed and displayed in the table
4. Note: upon import the column chart will update with the total amount of each classification type.
