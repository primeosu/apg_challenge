#File Tracker#

This is an application that lets you upload a CSV file that assumes the following headers

* MD5
* ClassificationName
* ClassificationType
* Size
* FileType

It then takes that info and stores it in the database.  As you upload CSVs you can see how many
of each Classification Type exist by navigating to the homepage.

This application is built on 'rails 4.24' a popular tutorial on how to do install it is [here](http://railsapps.github.io/installing-rails.html).

Next clone down the application.  Navigate to the folder in your terminal then type in 'bundle' to install the gems.

Next in your terminal type in 'rake db:create db:migrate' to create the DB.  I hope you have postgres installed!

To upload a CSV boot up a local rails server by typing in 'rails s' then use your favorite browser and go to 'localhost:3000'
then click on CSV uploader to upload that CSV.

Finally upload a CSV that uses the headers above.  Under 'spec/example_csvs' there is a file named 'example_file.csv'
you can use that as an example upload.  As you upload CSVs and you keep visiting the homepage you can see how many of each file there are by classification type.    
