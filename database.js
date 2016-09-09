var mysql = require('mysql');
var dotenv = require('dotenv');

dotenv.load();

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  supportBigNumbers: true
});

// Insert malware file data into database
exports.addMalwareData = function(data, callback) {
  var sql = "INSERT INTO malware(MD5, ClassificationName, ClassificationType, Size, FileType) VALUES(?);";
  // Get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { callback("Error making connection to database."); }
    // Query the database
    connection.query(sql, [data], function(err) {
      connection.release();
      if(err) { callback("Query error (possible duplicate)."); }
      else { callback(false); }
    });
  });
};

// Get number of each classification type from the database
exports.getClassificationTypeCount = function(callback) {
  var sql = "SELECT ClassificationType, COUNT(*) AS Total FROM malware GROUP BY ClassificationType;";
  // Get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true, null); return; }
    // Query the database
    connection.query(sql, function(err, rows) {
      connection.release();
      if(err) { console.log(err); callback(true, null); return; }
      callback(false, rows);
    });
  });
};