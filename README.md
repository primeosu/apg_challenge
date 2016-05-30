# Watch_Dog: A CSV Data Import Application

## Introduction
I created a web application that accepts a CSV file through a form file input attribute and stores the file's malware data in a relational database. The application also displays the total amount of each different class type in the database and shows this information above the table. The information is updated after each successful import. My application does NOT require any for-pay software to function.

## Assumptions
1. Columns will always be in the given order (MD5, ClassificationName, ClassificationType, Size, FileType) and more columns should not be added **(GIVEN)**.
2. There will always be data in each column **(GIVEN)**.
3. There will always be a header line in the CSV file **(GIVEN)**.
4. There will never be a duplicate MD5 **(GIVEN)**.
5. The ClassificationTypes in the example CSV are clean, trojan, virus, unknown, and pup. However, it is assumed that more types can be added so the application must dynamically keep a count of each type.
6. Since the directions only mention CSV imports, I needed to come up with a way to ensure that only CSV files were uploaded. If a user tries to upload a txt or anything else, the application should redirect the user to the homescreen.
7. There's no mention of how the data is supposed to be sorted so I am sorting by MD5.
8. There are no restrictions on the number of languages or frameworks to be used **(GIVEN)**. However, I only used the technologies listed for the position.

## How to Run
1. git clone https://github.com/AbhishekNose/apg_challenge.git
2. cd apg_challenge
3. bundle install
4. bundle exec rails server
	* Use whatever command you use to start the server.


## Tools
I will utilize the tools that are listed in the job description which are:
* **HTML5** (for the skeleton of my application)
* **CSS3** (to style my application)
* **JavaScript** (for DOM manipulation)
* **jQuery** (DOM manipulation, gem prerequisites, & general debugging/testing)
* **Bootstrap** (my frontend framework for the navbar and table)
* **SQLite** (not listed, but is the default database in Rails)
* **Ruby** & **Ruby on Rails** (where the fun stuff begins)

Other Noteworthy Tools:
* **Cloud9 IDE**
* **Google Fonts**
* **Unsplash** (for copyright-free images)

Noteworthy Gems:
* **Autoprefixer** (automatically makes CSS cross-platform)
* **jQuery Datatables** (allow filtering, sorting, search, and pagination)

## Sources
1. https://stackoverflow.com/questions/11924526/rails-generate-model
    * Generating the model from the CLI.
2. https://getbootstrap.com/components/
    * Table, navbar, alert messages.
3. https://github.com/rweng/jquery-datatables-rails
    * Gem for table filtering, searching, sorting, and pagination.
4. http://www.mattmorgante.com/technology/?offset=1428324390100
    * Working with CSV files in Rails.
5. http://ruby-doc.org/stdlib-1.9.3/libdoc/csv/rdoc/CSV.html
    * More info on CSV in Ruby.
6. http://www.unsplash.com
    * Copyright-free images.
