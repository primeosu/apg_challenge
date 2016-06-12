var express = require('express');
var mysql = require('mysql');
var Baby = require('babyparse');
var fs = require('fs');
var multer = require('multer');
var html = require('html');
var ejs = require('ejs');
var upload = multer({dest: '/tmp'});

var app = express();
app.set('json spaces', 2);
app.set('views', __dirname + '../views');
app.engine('html', require('ejs').renderFile);

var tableWidth = 5;
var batchMax = 10;
var con = mysql.createPool({
    host: "localhost",
    user: "chris",
    password: "chris",
    database: "db"
});

// Get the home page
app.get('/', function(req, res) {
    res.render(__dirname + "/views/index.html");
});

// Get the count of the unique classification names
app.get('/data.json', function(req, res) {

    sql = "SELECT ClassificationName, COUNT(*) FROM threats GROUP BY ClassificationName"; 
    queryDB(sql, con, [], function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Parse the csv file and store it in database
app.post('/parse', upload.single('theFile'), function(req, res, next) {
    // The user tried to upload nothing
    if(!req.file) {
        console.log("Null req.file");
        return;
    }
    
    // Read the buffer and hand it off to the parser 
    var csv = fs.readFileSync(req.file.path, {encoding: 'binary'});
    var parsed = Baby.parse(csv);

    // If we got an empty object then the data didn't parse correctly   
    if(!parsed) return; 

    // SQL statement
    var sql = "INSERT INTO threats(MD5, ClassificationName, ClassificationType, Size, FileType) Values ? ON DUPLICATE KEY UPDATE MD5=MD5"

    var rows = parsed.data;
    var values = [];
    for(var i = 1; i < rows.length-1; i++) {
        var item = [];
        for(var j = 0; j < tableWidth; j++) {
           item.push(rows[i][j]);
        }

        // Add the next item into the values
        values.push(item);

        // Batch the queries
        if(i % batchMax == 0) {
            queryDB(sql, con, values, nope)
            values = [];
        }
    }

    // Send the last batch
    if(values.length > 0) {
        queryDB(sql, con, values, nope);
    }
    
    // Reload the page with the new data
    res.render(__dirname + "/views/index.html");
});

// Dummy callback 
function nope() {}

// Write to the database
function queryDB(sql, con, values, callback) {
    // Set up the connection the MYSQL DB
    con.getConnection(function(err) {
        if(err) {
            console.log("Error in connecting");
        } else {
            console.log("Connected");
        }

        con.query(sql, [values], function(err,result) {
            if(err) {
                console.log(err);
            } else {
                // Used for getting the results of the query
                if(values.length == 0) {
                    callback(err, result);
                }
                console.log("All good");
            }
        });
    });
}

app.listen(3030, function() {
    console.log("Server Running on http://127.0.0.1:3030");
});

