const db = require('./queries');
const db1 = require('./queries1');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/create', db.createRecord);

app.get('/types', db1.getTypes);

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'});
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
