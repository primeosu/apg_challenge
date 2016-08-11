# Intel Security Programming Challenge

Web development example for normalizing data in a CSV file.

## Description

Included below is a brief overview of the project structure and workflow. This project uses the LAMP web stack to handle file processing and data normalization. The helper files that are used to perform database operations utilize an object orientated architecture.

### Structure

The directory tree of the project is outlined below with comments. The directory layout is based on Ruby on Rails convention.

  ```sql
  -- contains core application files
  - app
        -- application assets - php class files, views, javascripts, and stylesheets
        - assets
              - css
              - data
              - js
              - php
        -- helper files for processing files and server-side logic
        - helpers
        -- views for displaying data
        - views
  -- contains database schema file for creating the database
  - db
        -- database build queries in mysql
        - sql
  -- index
  index.html
  -- readme
  readme.md
  ```

This web application features two views:
  * [index.html](https://github.com/kylesb/apg_challenge/blob/master/index.html)

  The first page allows text/csv files to be uploaded via a form. File validation is performed on the client side via `input type='text/csv'`, as well as on the server-side via PHP in [`app/helpers/processFile.php`](https://github.com/kylesb/apg_challenge/blob/master/app/helpers/processFile.php).

  * [/app/views/display.php](https://github.com/kylesb/apg_challenge/blob/master/app/views/display.php)

  The second page displays data in the view, in the form of a table. This view features an input field that performs asynchronous data filtering on the MD5 and filesize columns (as they are string fields, and do not reference foreign keys).


### Workflow

1. The uploaded file is sent to the server via a post request, and processed via a helper in [`app/helpers/processFile.php`](https://github.com/kylesb/apg_challenge/blob/master/app/helpers/processFile.php). The uploaded file is checked for validation.

2. The helper performs data validation, and upon success, creates an object from the [`app/helpers/queries.class.php`](https://github.com/kylesb/apg_challenge/blob/master/app/helpers/queries.class.php) to perform data operations. The queries class provides various functions, including getting foreign key references, and inserting records for any table.

3. Upon successful completion of data normalization, [`app/helpers/processFile.php`](https://github.com/kylesb/apg_challenge/blob/master/app/helpers/processFile.php) redirects the http header to [`app/views/display.php`](https://github.com/kylesb/apg_challenge/blob/master/app/views/display.php) to display the data in the view.

4. Display.php provides the data in an accessible table format, and allows for asynchronous data filtering on the MD5 and filesize columns. 

## Stack

This web application is built on the LAMP web stack.

* PHP 5.6
* MySQL
* JavaScript
* HTML/CSS

## Acknowledgements

This project uses an open-source PHP/MySQL PDO connection class, available [here](https://github.com/a1phanumeric/PHP-MySQL-Class).

## Debugging / Testing

Debugging and testing was performed via XAMPP.

## Cloning / Viewing

To run this application...

1. git clone
