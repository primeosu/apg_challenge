'use strict';

const Malware = use("App/Models/Malware")
const csv = require("fast-csv");
const Helpers = use('Helpers');
const fs = require("fs");

class ApiController {

 async getMalwareCounts(){

    var trojanCount =  await Malware.query().where('ClassificationType', "trojan").getCount();
    var cleanCount =  await Malware.query().where('ClassificationType', "clean").getCount();
    var unknownCount =  await Malware.query().where('ClassificationType', "unknown").getCount();
    var virusCount =  await Malware.query().where('ClassificationType', "virus").getCount();
    var pupCount =  await Malware.query().where('ClassificationType', "pup").getCount();

    return {
      trojanCount,
      cleanCount,
      unknownCount,
      virusCount,
      pupCount
    };
  }


  async uploadCSV({ request }){
    const csvData = request.file('data', {
  
      size: '2mb'
    })

    console.log(csvData)
  
    await csvData.move(Helpers.tmpPath(), {
      name: 'data.csv',
      overwrite: true
    })
  
    if (!csvData.moved()) {
      return csvData.error()
    }
     
    var fileStream = fs.createReadStream(Helpers.tmpPath('data.csv'));
  
    csv
      .fromStream(fileStream, {headers: true})
      .on('data', async data => {
        const malware = new Malware();
  
        malware.MD5 = data.MD5;
        malware.ClassificationName = data.ClassificationName;
        malware.ClassificationType = data.ClassificationType;
        malware.Size = data.Size;
        malware.FileType = data.FileType;
  
        await malware.save();
      })
      .on('end', function() {
        console.log('done');
      });
  
    return 'File moved'

  }




}

module.exports = ApiController;
