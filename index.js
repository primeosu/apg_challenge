var express = require("express");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var pg = require("pg");
var copyFrom = require("pg-copy-streams").from;
var app = express();

app.set("port", (process.env.PORT || 3000));

// serve public folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));
// root route
app.get("/", function(req, res) {
    res.sendFile("index.html", {root: path.join(__dirname, "./")});
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
           
            
            // perform all queries in array
            // sync probs could exist here, pass call back to send response
            // to fix
            /*
            for (var i = 0; i < input.length; i++) {
                executeQuery(input[i]);   
            }
            */
            
            pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                
                var stream = client.query(copyFrom('COPY malware_table FROM STDIN'));
                var fileStream = fs.createReadStream(file.name)
                fileStream.on('error', function(done) {
                    console.log("error on file stream");
                    done();
                });
                stream.on('error', function(done) {
                    
                    console.log("error on stream");
                    done();
                });
                stream.on('end', function(done) {
                    console.log("query done");
                    done();
                });
                fileStream.pipe(stream);            
            });
            
            console.log("sending status");
            res.sendStatus(200);
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