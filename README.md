# Intel Security Programming Challenge

Web development example for normalizing data in a CSV file.

## Description

Included below is a brief overview of the project structure and workflow. This project uses the LAMP web stack to handle file processing and data normalization, as I felt that using Ruby on Rails would be a bit heavy for the application purpose.

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

  The second page will display data in the view.


### Workflow

1. The uploaded file is sent to the server via a post request, and processed via a helper in [`app/helpers/processFile.php`](https://github.com/kylesb/apg_challenge/blob/master/app/helpers/processFile.php). The uploaded file is checked for validation, and normalized for insertion into the database.


## Stack

This web application is built on the LAMP web stack.

* PHP 5.6
* MySQL
* JavaScript
* HTML/CSS

## Estimated timeline

I am currently completing this project on weekend time. Estimated timeline of completion is Sunday, August 14th.

## Acknowledgements

This project uses an open-source PHP/MySQL PDO connection class, available [here](https://github.com/a1phanumeric/PHP-MySQL-Class).

## Debugging / Testing

Debugging and testing was performed via XAMPP.
