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

---
# Installation
1. Clone the repository and switch to my working branch

        git clone https://github.com/dabassett/apg_challenge
        cd apg_challenge
        git checkout bassett

2. If you don't already have it, install ruby and rubygems. I believe Pat mentioned that you're on ruby 2.1.2 and rails 4.1, so that's what my submission targets

        # ubuntu/debian
        sudo apt-get install ruby
        sudo apt-get install rubygems
        
        # redhat/centOS
        sudo yum install ruby
        sudo yum install rubygems

3. Or even better, use rvm to create a seperate gemset

        rvm use 2.1.2@apg_challenge --create

4. Install bundler and let it do the rest

        gem install bundler
        # ...magic happens...
        bundle install
        # ...more magic...

5. Set up the database

        rake db:create
        rake db:migrate

6. Launch the server

        rails server

7. Point your browser to http://localhost:3000


## Some notes about my implementation
- I left the sqlite adapter in place. Since this is essentially a demo I didn't see any need to
require mysql and complicate the setup.

- The Classification model is still denormalized

  It contains ClassificationType as threat_type and ClassificationName as behavior. I chose to
do this to reduce the number of skinny tables and because these attributes do have some dependence
(ie there shouldn't be a 'clean' 'Downloader' present in the dataset).

  You might disagree, especially since a real-world equivalent would likely be much more complex and
in that case full normalization would probably be a better approach to start with.

- I think Rails is a pretty good fit for this project, and not just because I'm a shameless fanboy

  Although a lot of its feature set is unused for the project, there's a lot of
potential for expansion that rails would make easier. Fleshing out the resource features would let
you build a decent dashboard for working with malware. From there you could easily toss in a json
api and now you're providing services that other apps can easily hook into.

  In general I like rails for prototypes, small utilities and web services, since it's quick to set
up, easy to maintain, and has a ready answer for most common web app tasks.

- I've added some extras in. For the most part these are all things that I consider basic and
necessary for anything that's going to get used more than once.

  - RSpec unit tests for the models and controller
    
    Normally I would test the frontend with Capybara feature specs but I figured you would
probably want the project submitted some time before the end of the year so I had to cut back somewhere.

  - Validation on all input data

    Mostly this applies to the MD5 field, where I enforce uniqueness. The birthday problem is extremely
unlikely to appear for MD5 hashes, but it is likely that duplicates are accidentally introduced to the
database, for instance if you accidentally process the same csv twice.

    - I skipped the null object pattern since in my experience it's easier to introduce bugs in rails when you
aren't expecting nils from your database. Instead null is not allowed by db constraint and 'unknown' is set
to be the default.

  - CSV imports are applied in a database transaction. If some of the data causes
an exception to be thrown, the database is safely rolled back to it's original
state.

  - Since 'Import failed' doesn't really help us, an error message is displayed
with the line number, the entire failing row, and the validation error that
triggered it.

  - Some custom bootstrap widgets and styles. As long as the framework is in there we should do something
with it right?
