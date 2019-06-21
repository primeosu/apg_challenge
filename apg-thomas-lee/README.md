# McAfee Coding Challenge

### Technologies Used

- Front-End: React
- Back-End: NodeJS
- Database: PostgreSQL

### How to Setup the Database

- Install/Start a local instance of Postgres with these properites:
  - host: localhost
  - port: 5432
  - database: postgres
  - user/pw: admin/admin
  - table: api
    - column/type: md5/varchar
    - column/type: classificationname/varchar
    - column/type: classificationtype/varchar
    - column/type: size/int
    - column/type: filetype/varchar

### How to Setup the Back-End

- Install the latest NodeJS locally
- In a terminal, navigate to the ~/back-end folder then run the commands: `npm install` then `node index.js`
- The Back-End runs on http://localhost:3001

### How to Setup the Front-End

- In a terminal, navigate to the ~/front-end folder then run the commands: `npm install` then `npm start`
  - The Front-End runs on http://localhost:3000

### How to Use the Application

- Click the 'Choose File' button to select and CSV to upload
  - This will parse the CSV and create a POST to the back end
- Click the 'Show Classification Types' button to display a list of the types and its counts
  - This creates a GET to the back end that sends back a response
