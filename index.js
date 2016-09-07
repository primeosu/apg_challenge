var express = require("express");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var pg = require("pg");
var app = express();

app.set("port", (process.env.PORT || 3000));

// serve public folder
app.use(express.static(__dirname + "/public"));

// root route
app.get("/", function(req, res) {
    res.sendFile("index.html", {root: path.join(__dirname, "./")});
});


// return entire database json
app.get("/draw", function(req, res) {
    
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                
        // check for sql injections later
      
        var query = client.query('select * from malware_table', function(err, result) {
            done();
            if (err) {
                error = err;
                console.error("Error while post query: " + err); 
            }
            
            else {
                res.setHeader('Content-Type', 'application/json');
                console.log("IM SLEEPING AFTER THIS: " + result.rows.length);
                var malware = {len: result.rows.length};
                console.log(result.rows);
                res.send(JSON.stringify({results: result.rows, summary: summarize(result.rows)}));
            }

        });         
       
    });
    
});

// load csv route
app.post("/load", function(req, res) {
    
    var form = new formidable.IncomingForm();
    
    form.multiples = true;
    
    form.uploadDir = path.join(__dirname, "/uploads");

    form.on('file', function(field, file) {
        
        // delete temp uploads once data has been loaded to db
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        
        // extra contents of csv
        fs.readFile(form.uploadDir + "/" + file.name, "utf-8", function(err, data) {
            
            if (err) {
                return console.log(err);
            }
            
            var lines = data.trim().split("\n");
            var input = parse(lines);
            var sendCode = function(res) {
                console.log("server sending response");
                res.sendStatus(200);
            }
            
            // bottleneck?
            pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                
                var lock = input.length;
                
                // perform all queries in array
                for (var i = 0; i < input.length; i++) {
                    
                   
                    // check for sql injections later
                    var query = client.query('insert into malware_table values ($1, $2, $3, $4, $5)', [input[i].md5, input[i].classification_name, input[i].classification_type, input[i].size, input[i].file_type], function(err, result) {
                        done();
                        if (err) {
                            error = err;
                            console.error("Error while post query: " + err); 
                        }

                    });
                    
                    // sending response on end means if a query fails, the app fails
                    query.on("end", function(result) {
                        lock--;
                        
                        if (lock <= 0) {
                            console.log("all querys have been finished: " + lock);
                            res.sendStatus(200);
                        }
                    });
                  
                }
            });
            
           
          
            
        });
    });
    
    // redo
    form.on("error", function(err) {
        console.log("error occured during file upload: " + err);
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

function executeQuery(input) {
    
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                
        // check for sql injections later
        client.query('insert into malware_table values ($1, $2, $3, $4, $5)', [input.md5, input.classification_name, input.classification_type, input.size, input.file_type], function(err, result) {
            done();
            if (err) {
                error = err;
                console.error("Error while post query: " + err); 
            }

            else { 
                console.log("Successful Query!");
            }
        });              
    });
}

// malware is an array of json
// malware = [{}, {}, {}]
// returns a json containing category summary
function summarize(malware) {
    
    var result = {};
    for (var i = 0; i < malware.length; i++) {
        
        // prop doesnt exist
        console.log("looking at: " + malware[i].ClassificationType);
        if (!result.hasOwnProperty(malware[i].ClassificationType)) {
            console.log("does not have");
            result[malware[i].ClassificationType] = 1;
        }
        
        // if it does exist, increment
        else {
            console.log("has so increment");
            result[malware[i].ClassificationType]++;
        }
    }
    
    console.log("what: " + result);
    return result;
}