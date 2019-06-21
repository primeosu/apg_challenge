const pgp = require('pg-promise')({
  capSQL: false
});

const db = pgp('postgres://admin:admin@localhost:5432/postgres');
const cs = new pgp.helpers.ColumnSet(
  ['md5', 'classificationname', 'classificationtype', 'size', 'filetype'],
  {
    table: 'api'
  }
);

const createRecord = (request, response) => {
  const values = [];

  var length = request.body.arrayObj.length;
  for (var i = 0; i < length - 1; i++) {
    var obj = {
      md5: request.body.arrayObj[i]['md5'],
      classificationname: request.body.arrayObj[i]['classificationname'],
      classificationtype: request.body.arrayObj[i]['classificationtype'],
      size: parseInt(request.body.arrayObj[i]['size'], 10),
      filetype: request.body.arrayObj[i]['filetype']
    };
    values.push(obj);
  }

  const query = pgp.helpers.insert(values, cs);

  db.none(query)
    .then(data => {
      // success;
    })
    .catch(error => {
      // error;
    });
};

module.exports = {
  createRecord
};
