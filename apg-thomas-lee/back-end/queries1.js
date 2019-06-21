const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432
});
const getTypes = (request, response) => {
  pool.query(
    'SELECT classificationtype, COUNT(*) FROM api GROUP BY classificationtype',
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
      response.status(200).json(result.rows);
    }
  );
};

module.exports = {
  getTypes
};
