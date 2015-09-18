/**
 * /public/views/upload/upload.js
 *
 * @description: Upload view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js'),
    Modal = require('../../utils/modal.js');

var Malwares = require('../../collections/malwares.js');

module.exports = Backbone.View.extend({

  /**
   * Upload.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.malwares = new Malwares();

    this.errorTemplate = _.template(this.parent.ui.$errorTemplate.html());

    new Request({
      url: 'views/upload/upload.tmpl',
      callback: function (error, body) {
        if (!error) {
          that.template = _.template(body);
        }

        that.render();
      }
    });
  },

  /**
   * Upload.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $uploadInput: $('#upload-input')
    };
  },

  /**
   * Upload.render()
   * @description: Draws the view
   */
  render: function () {
    if (!this.template) {
      return this.$el.html(this.errorTemplate());
    }

    this.$el.html(this.template());
    this.setUiElements();
  },

  /**
   * Upload.events
   * @description: Declares view click events
   */
  events: {
    'click #select-file': 'selectFile'
  },

  /**
   * Upload.selectFile()
   * @description: Clicks hidden ugly input and sets change event
   */
  selectFile: function () {
    this.ui.$uploadInput.click().on('change', _.bind(this.changeFile, this));
  },

  /**
   * Upload.changeFile()
   * @description: Starts the upload if a file was selected
   */
  changeFile: function () {
    var filePath = this.ui.$uploadInput.val();

    if (!filePath) {
      return;
    }

    this.getFileData();
  },

  /**
   * Upload.getFileData()
   * @description: Gets uploaded file's contents and checks for validity
   */
  getFileData: function () {
    var that = this,
        files = this.ui.$uploadInput[0].files,
        reader = new FileReader();

    function load() {
      return function (event) {
        var malwares = that.parseFile(event.target.result);
        that.uploadMalwares(malwares);
      }
    }

    _.each(files, function (file) {
      reader.onload = load();
      reader.readAsBinaryString(file);
    });
  },

  /**
   * Upload.parseFile()
   * @description: Converts the file string in to an Array of malware Objects
   * @param: {String} file
   * @returns: {Array}
   */
  parseFile: function (file) {
    var rows = file.split('\n'),
        invalid = false,
        rowDatas = [],
        md5s = [];

    function invalidData(message) {
      that.modal = new Modal({
        title: 'Error',
        message: message,
        buttons: [{ text: 'Ok', callback: function () { that.modal.close(); } }]
      });
    }

    if (rows[0] != ["MD5,ClassificationName,ClassificationType,Size,FileType"]) {
      return invalidData('The selected CSV file does not contain column headers.');
    }

    rows.shift();

    for (var index = 0; index < rows.length; index++) {
      if (!rows[index]) {
        continue;
      }

      rowDatas.push(rows[index].split(','));

      if (rowDatas[index].length !== 5) {
        return invalidData('The selected CSV file has an invalid number of columns.');
      }

      if (_.contains(md5s, rowDatas[index][0])) {
        return invalidData('The selected CSV file contains a duplicate md5.');
      }

      md5s.push(rowDatas[index][0]);
    }

    for (var index = 0; index < rowDatas.length; index++) {
      _.each(rowDatas[index], function (data) {
        if (data.length > 64) {
          invalid = true;
          return invalidData('The selected CSV file contains a value with greater than 64 characters.');
        }
      });

      if (invalid) {
        return;
      }
    }

   return  _.map(rowDatas, function (rowData) {
      return {
        md5: rowData[0],
        classificationName: rowData[1],
        classificationType: rowData[2],
        fileSize: rowData[3],
        fileType: rowData[4]
      };
    });
  },

  /**
   * Upload.uploadMalwares()
   * @description: Persists malwares to the server and then displays the total amount of unique classification types
   * @param: {Array} malwares
   */
  uploadMalwares: function (malwares) {
    var that = this;

    function showModal(title, message) {
      that.modal = new Modal({
        title: title,
        message: message,
        buttons: [{ text: 'Ok', callback: function () { that.modal.close(); } }]
      });
    }

    new Request({
      method: 'post',
      url: 'malwares',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(malwares),
      callback: function (error, response) {
        if (error) {
          return showModal('Error', 'The malwares failed to upload.');
        }

        showModal('Info', 'The malwares uploaded succesfully. You can now view the amount of each malware type on the Types page.');
      }
    });
  }

});

