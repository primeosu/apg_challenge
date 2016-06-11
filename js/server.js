var express = require('express');
var mysql = require('mysql');
var Baby = require('babyparse');
var fs = require('fs');
var multer = require('multer');

var upload = multer({dest: '/tmp'});
var app = express();

var tableWidth = 5;
var batchMax = 10;
var con = mysql.createPool({
    host: "localhost",
    user: "chris",
    password: "chris",
    database: "db"
});

app.post('/', upload.single('theFile'), function(req, res, next) {
    // The user tried to upload nothing
    if(!req.file) {
        console.log("Null req.file");
        return;
    }

    // Read the buffer and put it into a comma seperated file
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
            queryDB(sql, con, values)
            values = [];
        }
    }

    // Send the last batch
    if(values.length > 0) {
        ret = queryDB(sql, con, values);
    }

    res.writeHead(200, "OK",{'Content-Type': 'text/html'});
    res.status(200).end("CSV added to database!"); 
});

// Write to the database
function queryDB(sql, con, values) {

    // Set up the connection the MYSQL DB
    con.getConnection(function(err) {
        if(err) {
            console.log("Error in connecting");
        } else {
            console.log("Connected");
        }

        con.query(sql, [values], function(err,result) {
            if(err) {
                console.log(err.code);
            } else {
                console.log(result);
            }
        });
    });
}

app.listen(3030, function() {
    console.log("Server Running");
});

