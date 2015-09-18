(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * /public/app.js
 *
 * @description: Main frontend script
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: Septemeber 17th 2015
 */

(function () {

  'use strict';

  var Header = require('./views/header/header.js'),
      Nav = require('./views/nav/nav.js'),
      Database = require('./views/database/database.js'),
      Upload = require('./views/upload/upload.js'),
      Types = require('./views/types/types.js');

  var App = Backbone.Router.extend({

    /**
     * App.initialize()
     * @description: Sets up the application
     */
    initialize: function () {
      var that = this;

      this.views = {};
      this.errorTemplate = _.template($('#error-template').html());

      Backbone.history.start();

      async.series([function (callback) {
        that.header = new Header({
          el: $('#header'),
          callback: callback
        });
      }, function (callback) {
        that.nav = new Nav({
          el: $('#nav'),
          callback: callback,
          router: that
        });
      }], function (error) {
        if (error)
          $('#content').html(this.errorTemplate());

        $('#content-wrapper').removeClass('hidden');
        $('#content-wrapper').height($('#content-wrapper').height() - $('#header').height());
      });
    },

    /**
     * App.routes
     * @description: Declares app view routing
     */
    routes: {
      '': 'redirectToUpload',
      'database': 'database',
      'upload': 'upload',
      'types': 'types'
    },

    /**
     * App.redirectToUpload()
     * @description: Redirect to the upload view when no page is specified
     */
    redirectToUpload: function () {
      window.location.replace('#/upload');
    },

    /**
     * App.database()
     * @description: Creates the database view or renders it if it already exists
     */
    database: function () {
      if (!this.views.database)
        this.views.database = new Database({
          el: $('#content')
        });
      else
        this.views.database.render();
    },

    /**
     * App.upload()
     * @description: Creates the upload view or renders it if it already exists
     */
    upload: function () {
      if (!this.views.upload)
        this.views.upload = new Upload({
          el: $('#content')
        });
      else
        this.views.upload.render();
    },

    /**
     * App.types()
     * @description: Creates the types view or renders it if it already exists
     */
    types: function () {
      if (!this.views.types)
        this.views.types = new Types({
          el: $('#content')
        });
      else
        this.views.types.render();
    }

  });

  var app = new App();

})();


},{"./views/database/database.js":6,"./views/header/header.js":7,"./views/nav/nav.js":8,"./views/types/types.js":9,"./views/upload/upload.js":10}],2:[function(require,module,exports){
/**
 * /public/collections/malwares.js
 *
 * @descrpition: Malwares collection
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Malware = require('../models/malware.js');

module.exports = Backbone.Collection.extend({

  model: Malware,

  url: 'malwares',

  /**
   * Malwares.amountOfTypes()
   * @description: Determines the amount of each classification type
   * @returns: {Array}
   */
  amountOfTypes: function () {
    var classificationTypes = [];

    _.each(this.models, function (malware) {
      var classificationType = _.findWhere(classificationTypes, { classificationType: malware.get('classificationType') });

      if (classificationType)
        classificationType.malwares.push(malware);
      else
        classificationTypes.push({
          classificationType: malware.get('classificationType'),
          malwares: [malware]
        });
    });

    return classificationTypes;
  }

});


},{"../models/malware.js":3}],3:[function(require,module,exports){
/**
 * /public/models/malware.js
 *
 * @description: Malware model
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: Septmeber 17th 2015
 */

module.exports = Backbone.Model.extend({

  defaults: {
    md5: '',
    classificationName: '',
    classificationType: '',
    fileSize: '',
    fileType: ''
  }

});


},{}],4:[function(require,module,exports){
/**
 * modal.js
 *
 * @description: Bootstrap modal wrapper class
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: July 14th 2015
 */

function Modal(options) {
  _.extend(this, options);

  this.$el = $('#modal');
  this.$title = $('#modal-title');
  this.$message = $('#modal-message');
  this.$buttons = $('#modal-buttons');

  this.render();
}

/**
 * Modal.render()
 * @description: Shows the modal
 */
Modal.prototype.render = function () {
  var that = this;

  this.$title.text(this.title);
  this.$message.text(this.message);

  if (this.buttons) {
    this.$buttons.html('');

    _.each(this.buttons, function (button) {
      var $element = $('<button type="button">' + button.text + '</button>');
      $element.click(button.callback);
      that.$buttons.append($element);
    });
  } else {
    var $button = $('<button type="button" data-dismiss="modal">Ok</button>');
    $button.click(this.callback);
    this.$buttons.append($button);
  }

  this.$el.modal('show');
};

/**
 * Modal.close()
 * @description: Hides the modal
 */
Modal.prototype.close = function () {
  this.$el.modal('hide');
};

module.exports = Modal;


},{}],5:[function(require,module,exports){
/**
 * public/utils/request.js
 *
 * @description: Fetch wrapper class with automatic error handling
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: July 14th 2015
 */

/**
 * Request()
 * @description: Creates a new Request object and makes an ajax request
 * @param: {Object} options
 */
function Request(options) {
  _.extend(this, options);

  this.fetch();
}

/**
 * Request.fetch()
 * @description: Makes an ajax request using fetch
 */
Request.prototype.fetch = function () {
  var that = this;

  /**
   * checkStatus()
   * @description: Breaks the promise chain if response is non-200
   * @param: {Object} response
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300)
      return response;

    throw {
      statusText: response.statusText,
      response: response
    };
  }

  fetch(this.url, {
    method: this.method || 'get',
    headers: this.headers,
    body: this.body
  }).then(checkStatus)
    .then(function (response) {
      if (response.status === 204)
        return;

      if (response.headers.get('Content-Type') === 'application/json')
        return response.json();
        
      return response.text();
    }).then(function (body) {
      return that.callback(null, body);
    }).catch(function (error) {
      if (error.response && error.response.status === 204)
        return that.callback();

      return that.callback(error);
    });
};

module.exports = Request;

},{}],6:[function(require,module,exports){
/**
 * /public/views/database/database.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Malwares = require('../../collections/malwares.js');

module.exports = Backbone.View.extend({

  /**
   * Database.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.malwares = new Malwares();

    this.errorTemplate = _.template($('#error-template').html());
    this.loadingTemplate = _.template($('#loading-template').html());

    new Request({
      url: 'views/database/database.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * Database.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template)
      return this.$el.html(this.errorTemplate());

    if (!this.malwares.length)
      this.$el.html(this.loadingTemplate());
    else
      $('#database-page-loading').removeClass('hidden');

    this.malwares.on('sync', function () {
      that.$el.html(that.template({ malwares: that.malwares }));
    });

    this.malwares.on('error', function (error) {
      that.$el.html(that.errorTemplate());
    });

    this.malwares.fetch();

    this.resize()
    $(window).resize(this.resize);
  },

  /**
   * Database.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    $('#database-content div.table-wrapper').css('max-height', $('#content > div.box').height() - 195);
  }

});


},{"../../collections/malwares.js":2,"../../utils/request.js":5}],7:[function(require,module,exports){
/**
 * /public/views/header/header.js
 *
 * @description: Header view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * Header.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/header/header.tmpl',
      callback: function (error, body) {
        if (error)
          return that.callback(error);

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');

        return that.callback();
      }
    });
  },

  /**
   * Header.render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    $('#content-wrapper').css('height', 'calc(100% - ' + this.$el.height() + 'px)');
  }

});


},{"../../utils/request.js":5}],8:[function(require,module,exports){
/**
 * /public/views/nav.js
 *
 * @description: Navigation view
 * @author: Chris Young (cyoung@mobiquityinc.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

module.exports = Backbone.View.extend({

  /**
   * Nav.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    new Request({
      url: 'views/nav/nav.tmpl',
      callback: function (error, body) {
        if (error)
          return options.callback(error); 

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');
        that.listenTo(that.router, 'route', that.setActive);

        return options.callback();
      }
    });
  },

  /**
   * Nav.render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    this.toggle();
    this.setActive();
  },

  /**
   * Nav.events
   * @description: Declares click events
   */
  events: {
    'click #nav-toggle': 'toggle'
  },

  /**
   * Nav.toggle()
   * @description: Collpases and expands the navigation view to increase main content width
   * @param: {Object} event
   */
  toggle: function (event) {
    if (event) {
      event.preventDefault();
      this.collapsed = !this.collapsed; 
    }

    if (this.collapsed) {
      this.$el.removeClass('nav-expanded').addClass('nav-collapsed');
      $('#nav [data-toggle="tooltip"]').tooltip();
    } else {
      $('#nav [data-toggle="tooltip"]').tooltip('destroy');
      this.$el.removeClass('nav-collapsed').addClass('nav-expanded');
    }
  },

  /**
   * Nav.setActive()
   * @description: Highlights the current navigation item
   */
  setActive: function () {
    var $a = $('#nav a[href="' + window.location.hash + '"]');

    $('#nav li').removeClass('active');

    if ($a.hasClass('nav-sub-level'))
      $a.parent().parent().parent().addClass('active').addClass('expanded');

    $a.parent().addClass('active');
  }

});


},{"../../utils/request.js":5}],9:[function(require,module,exports){
/**
 * /public/views/types/types.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Malwares = require('../../collections/malwares.js');

module.exports = Backbone.View.extend({

  /**
   * Types.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.malwares = new Malwares();

    this.errorTemplate = _.template($('#error-template').html());
    this.loadingTemplate = _.template($('#loading-template').html());

    new Request({
      url: 'views/types/types.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * Types.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template)
      return this.$el.html(this.errorTemplate());

    if (!this.malwares.length)
      this.$el.html(this.loadingTemplate());
    else
      $('#type-page-loading').removeClass('hidden');

    this.malwares.on('sync', function () {
      that.$el.html(that.template({ types: that.malwares.amountOfTypes() }));
    });

    this.malwares.on('error', function (error) {
      that.$el.html(that.errorTemplate());
    });

    this.malwares.fetch();

    this.resize()
    $(window).resize(this.resize);
  },

  /**
   * Types.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    $('#type-content div.table-wrapper').css('max-height', $('#content > div.box').height() - 195);
  }

});


},{"../../collections/malwares.js":2,"../../utils/request.js":5}],10:[function(require,module,exports){
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

    this.errorTemplate = _.template($('#error-template').html());

    this.malwares = new Malwares();

    new Request({
      url: 'views/upload/upload.tmpl',
      callback: function (error, body) {
        if (!error)
          that.template = _.template(body);

        that.render();
      }
    });
  },

  /**
   * Upload.render()
   * @description: Draws the view
   */
  render: function () {
    if (!this.template)
      return this.$el.html(this.errorTemplate());

    this.$el.html(this.template());
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
    $('#upload-input').click();

    document.getElementById('upload-input').onchange = _.bind(this.changeFile, this);
  },

  /**
   * Upload.changeFile()
   * @description: Starts the upload if a file was selected
   */
  changeFile: function () {
    var filePath = $('#upload-input').val();

    if (!filePath)
      return;

    this.getFileData();
  },

  /**
   * Upload.getFileData()
   * @description: Gets uploaded file's contents and checks for validity
   */
  getFileData: function () {
    var that = this,
        files = $('#upload-input')[0].files,
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

    if (rows[0] != ["MD5,ClassificationName,ClassificationType,Size,FileType"])
      return invalidData('The selected CSV file does not contain column headers.');

    rows.shift();

    for (var index = 0; index < rows.length; index++) {
      if (!rows[index])
        continue;

      rowDatas.push(rows[index].split(','));

      if (rowDatas[index].length !== 5)
        return invalidData('The selected CSV file has an invalid number of columns.');

      if (_.contains(md5s, rowDatas[index][0]))
        return invalidData('The selected CSV file contains a duplicate md5.');

      md5s.push(rowDatas[index][0]);
    }

    for (var index = 0; index < rowDatas.length; index++) {
      _.each(rowDatas[index], function (data) {
        if (data.length > 64) {
          invalid = true;
          return invalidData('The selected CSV file contains a value with greater than 64 characters.');
        }
      });

      if (invalid)
        return;
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

    new Request({
      method: 'post',
      url: 'malwares',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(malwares),
      callback: function (error, response) {
        if (error) {
          that.modal = new Modal({
            title: 'Error',
            message: 'The malwares failed to upload.',
            buttons: [{ text: 'Ok', callback: function () { that.modal.close(); } }]
          });

          return;
        }

        that.modal = new Modal({
          title: 'Info',
          message: 'The malwares uploaded successfully. You can now view the amount of each malware type of the Types page.',
          buttons: [{ text: 'Ok', callback: function () { that.modal.close(); } }]
        });
      }
    });
  }

});


},{"../../collections/malwares.js":2,"../../utils/modal.js":4,"../../utils/request.js":5}]},{},[1])


//# sourceMappingURL=bundle.js.map