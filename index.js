var express = require("express");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var pg = require('pg');
var app = express();

app.set("port", (process.env.PORT || 3000));

// serve public folder
app.use(express.static(__dirname + "/public"));

// root route
app.get("/", function(req, res) {
    res.sendFile("index.html", {root: path.join(__dirname, "./")});
});

// db test route to load entire table
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM malware_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// load csv route
app.post("/load", function(req, res) {
    
    console.log("file recieved");
    var form = new formidable.IncomingForm();
    
    form.multiples = true;
    
    form.uploadDir = path.join(__dirname, "/uploads");

    form.on('file', function(field, file) {
        
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        
        // extra contents of csv
        fs.readFile(form.uploadDir + "/" + file.name, "utf-8", function(err, data) {
            
            if (err) {
                return console.log(err);
            }
            
            var lines = data.trim().split("\n");
            var input = parse(lines);
            for (var i = 0; i < input.length; i++) {
                
            // connect to database and execute query
            pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                
                    
                    var query_str = "INSERT INTO malware_table values (" + input.md5 + ", "  + input.classification_name + ", " + input.classification_type + ", " + input.size + ", " + input.file_type + ")";
                    
                    client.query("INSERT INTO malware_table values (1, 1, 1, 1, 1)", function(err, result) {
                        done();
                        if (err) { 
                            console.log("THERE WAS A GRAND ERROR");
                            console.error(err); 
                            res.send("Error " + err); 
                        }
                        
                        console.log("query result: " + result);
                    });
                
            });
            }
        });
    });
    
    // redo
    form.on("error", function(err) {
        console.log("error occured during file upload: " + err);
    });
    
    form.on("end", function() {
        res.end("success");
    });
    
    form.parse(req);
    
   
});

app.listen(app.get("port"), function() {
    console.log("application running on port: " + app.get("port"));
});

// takes array of csv lines represented as strings
// returns array json
function parse (lines) {
    
    var data = [];
    
    // start at i = 1 to skip header line
    for (var i = 1; i < lines.length; i++) {
        
        var line = lines[i].split(",");
        var json = {};
        
        json.md5 = line[0];
        json.classification_name = line[1];
        json.classification_type = line[2];
        json.size = parseInt(line[3]);
        json.file_type = line[4];
        
        data.push(json);
    }
    
    return data;
}