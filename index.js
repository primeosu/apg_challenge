var express = require("express");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
var app = express();

app.set("port", (process.env.PORT || 3000));

// serve public folder
app.use(express.static(__dirname + "/public"));

// root route
app.get("/", function(req, res) {
    res.sendFile("index.html", {root: path.join(__dirname, "./")});
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
                console.log(input[i].md5);
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
        json.size = line[3];
        json.file_type = line[4];
        
        data.push(json);
    }
    
    return data;
}