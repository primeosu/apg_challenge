var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var csv = require('csv');
var db = require('../database.js');

/*
POST - Upload CSV File
*/
router.route('/malwareData')
	.post(upload.single('malwareDataFile'), function(req, res, next) {
	  if(!req.file) {
	  	return res.status(400).send("No file provided"); }
	  if(req.file.mimetype != 'text/csv') {
	    return res.status(400).send("File is not a CSV file");
	  } else {
	    fs.readFile(req.file.path, 'utf8', function(err, data) {
	      if(err) { return res.status(400).send("Error reading file."); }
	      // Parse the file data into nested arrays
	      csv.parse(data, function(err, data) {
	        if(err) { return res.status(400).send("Error parsing file"); }
	        // Transform data (convert strings to lowercase and numbers to int)
	        csv.transform(data.slice(1), function(data) {
	          var transformedData = data.map(function(value, index, array){return (index != 3) ?  value.toLowerCase() : parseInt(value)});
	          // Store transformed data into database
	          db.addMalwareData(transformedData, function(err) {
	            if(err) { console.log(err); }
	          });
	        }); 
	      });
	    });
	  }
	  return res.status(200).send("File data has been added.");
	});

/*
GET - Retrieve malware classification type data (name, count)
*/
router.route('/classificationType')
	.get(function(req, res) {
	      db.getClassificationTypeCount(function(err, data) {
	        if(err) { return res.json(err); }
	        res.json(data);
	      });
});

module.exports = router;
