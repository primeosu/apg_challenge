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
      Malware = require('./views/malware/malware.js'),
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
      this.ui = {
        $body: $('body'),
        $header: $('#header'),
        $nav: $('#nav'),
        $content: $('#content'),
        $contentWrapper: $('#content-wrapper'),
        $errorTemplate: $('#error-template'),
        $loadingTemplate: $('#loading-template')
      };

      this.errorTemplate = _.template(this.ui.$errorTemplate.html());

      Backbone.history.start();

      async.series([function (callback) {
        that.header = new Header({
          parent: that,
          el: that.ui.$header,
          callback: callback
        });
      }, function (callback) {
        that.nav = new Nav({
          parent: that,
          el: that.ui.$nav,
          callback: callback,
          router: that
        });
      }], function (error) {
        if (error) {
          that.ui.$content.html(this.errorTemplate());
        }

        that.ui.$contentWrapper.removeClass('hidden');
        that.ui.$contentWrapper.height(that.ui.$contentWrapper.height() - that.ui.$header.height());
        
        $(window).resize(_.bind(that.resize, that));
      });
    },

    /**
     * App.resize()
     * @description: Vertically resizes content on window resize
     */
    resize: function () {
      this.ui.$contentWrapper.height(this.ui.$body.height() - this.ui.$header.height());
    },

    /**
     * App.routes
     * @description: Declares app view routing
     */
    routes: {
      '': 'redirectToUpload',
      'malware': 'malware',
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
     * App.malware()
     * @description: Creates the malware view or renders it if it already exists
     */
    malware: function () {
      if (!this.views.malware) {
        this.views.malware = new Malware({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.malware.render();
      }
    },

    /**
     * App.upload()
     * @description: Creates the upload view or renders it if it already exists
     */
    upload: function () {
      if (!this.views.upload) {
        this.views.upload = new Upload({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.upload.render();
      }
    },

    /**
     * App.types()
     * @description: Creates the types view or renders it if it already exists
     */
    types: function () {
      if (!this.views.types) {
        this.views.types = new Types({
          parent: this,
          el: this.ui.$content
        });
      } else {
        this.views.types.render();
      }
    }

  });

  var app = new App();

})();


},{"./views/header/header.js":8,"./views/malware/malware.js":9,"./views/nav/nav.js":10,"./views/types/types.js":11,"./views/upload/upload.js":12}],2:[function(require,module,exports){
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
   * sortMethod
   * @description: Used by Malwares.comparator() to define how the collection should be sorted
   */
  sortMethod: {
    key: 'md5',
    direction: -1
  },

  /**
   * Malwares.comparator()
   * @description: Used to maintain the collection in a sorted order
   * @param: {Malware} a
   * @param: {Malware} b
   * @returns: {Number}
   */
  comparator: function (a, b) {
    var aAttribute = a.get(this.sortMethod.key),
        bAttribute = b.get(this.sortMethod.key);

    if (aAttribute > bAttribute) {
      return -1 * this.sortMethod.direction;
    }

    if (aAttribute < bAttribute) {
      return 1 * this.sortMethod.direction
    }

    return 0;
  }

});


},{"../models/malware.js":4}],3:[function(require,module,exports){
/**
 * /public/collections/types.js
 *
 * @descrpition: Types collection
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Type = require('../models/type.js');

module.exports = Backbone.Collection.extend({

  model: Type,

  url: 'types',

  /**
   * sortMethod
   * @description: Used by Malwares.comparator() to define how the collection should be sorted
   */
  sortMethod: {
    key: 'classificationType',
    direction: -1
  },

  /**
   * Types.comparator()
   * @description: Used to maintain the collection in a sorted order
   * @param: {Malware} a
   * @param: {Malware} b
   * @returns: {Number}
   */
  comparator: function (a, b) {
    var aAttribute = a.get(this.sortMethod.key),
        bAttribute = b.get(this.sortMethod.key);

    if (aAttribute > bAttribute) {
      return -1 * this.sortMethod.direction;
    }

    if (aAttribute < bAttribute) {
      return 1 * this.sortMethod.direction
    }

    return 0;
  }

});


},{"../models/type.js":5}],4:[function(require,module,exports){
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


},{}],5:[function(require,module,exports){
/**
 * /public/models/type.js
 *
 * @description: Type model
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: Septmeber 17th 2015
 */

module.exports = Backbone.Model.extend({

  defaults: {
    classificationType: '',
    amount: 0
  }

});


},{}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

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
      if (response.status === 204) {
        return;
      }

      if (response.headers.get('Content-Type') === 'application/json') {
        return response.json();
      }
        
      return response.text();
    }).then(function (body) {
      return that.callback(null, body);
    }).catch(function (error) {
      if (error.response && error.response.status === 204) {
        return that.callback();
      }

      return that.callback(error);
    });
};

module.exports = Request;

},{}],8:[function(require,module,exports){
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
        if (error) {
          return that.callback(error);
        }

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');

        return that.callback();
      }
    });
  },

  /**
   * Header.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $contentWrapper: $('#content-wrapper')
    };
  },

  /**
   * Header.render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());
    this.setUiElements();
    this.ui.$contentWrapper.css('height', 'calc(100% - ' + this.$el.height() + 'px)');
  }

});


},{"../../utils/request.js":7}],9:[function(require,module,exports){
/**
 * /public/views/malware/malware.js
 *
 * @description: Malware view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Malwares = require('../../collections/malwares.js');

module.exports = Backbone.View.extend({

  /**
   * Malware.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.malwares = new Malwares();

    this.errorTemplate = _.template(this.parent.ui.$errorTemplate.html());
    this.loadingTemplate = _.template(this.parent.ui.$loadingTemplate.html());

    new Request({
      url: 'views/malware/malware.tmpl',
      callback: function (error, body) {
        if (!error) {
          that.template = _.template(body);
        }

        that.render();
      }
    });
  },

  /**
   * Malware.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $malwarePageLoading: $('#malware-page-loading'),
      $tableWrapper: $('#malware-content div.table-wrapper'),
      $contentBox: $('#content div.box'),
      $sortLinks: $('#malware-content a.sort-link')
    };
  },

  /**
   * Malware.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template) {
      return this.$el.html(this.errorTemplate());
    }

    if (!this.malwares.length) {
      this.$el.html(this.loadingTemplate());
    } else {
      this.ui.$malwarePageLoading.removeClass('hidden');
    }

    this.malwares.on('error sync', function (event) {
      if (event.type === 'error') {
        return that.$el.html(that.errorTemplate());
      }

      that.$el.html(that.template({ malwares: that.malwares }));
      that.setUiElements();

      that.resize()
      $(window).resize(_.bind(that.resize, that));
    });

    this.malwares.fetch();
  },

  /**
   * events
   * @description: Declares view click events
   */
  events: {
    'click #malware-content a.sort-link': 'sort'
  },

  /**
   * Malware.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    this.ui.$tableWrapper.css('max-height', this.ui.$contentBox.height());
  },

  /**
   * Malware.sort()
   * @description: Reorders the collection based on sort method
   */
  sort: function (event) {
    var $target = $(event.target).parents('a.sort-link');

    event.preventDefault();

    this.malwares.sortMethod.key = $target.data('key');
    this.malwares.sortMethod.direction = $target.find('span.sort-icon').hasClass('fa-sort-down') ? 1 : -1;
    this.malwares.sort();

    this.render();
  }

});


},{"../../collections/malwares.js":2,"../../utils/request.js":7}],10:[function(require,module,exports){
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
        if (error) {
          return options.callback(error);
        }

        that.template = _.template(body);
        that.render();
        that.$el.removeClass('hidden');
        that.listenTo(that.router, 'route', that.setActive);

        return options.callback();
      }
    });
  },

  /**
   * Nav.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $tooltips: $('#nav [data-toggle="tooltip"]'),
      $lis: $('#nav li')
    };
  },

  /**
   * Nav.render()
   * @description: Draws the view
   */
  render: function () {
    this.$el.html(this.template());

    this.setUiElements();

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
      this.ui.$tooltips.tooltip();
    } else {
      this.ui.$tooltips.tooltip('destroy');
      this.$el.removeClass('nav-collapsed').addClass('nav-expanded');
    }
  },

  /**
   * Nav.setActive()
   * @description: Highlights the current navigation item
   */
  setActive: function () {
    var $a = $('#nav a[href="' + window.location.hash + '"]');

    this.ui.$lis.removeClass('active');

    if ($a.hasClass('nav-sub-level')) {
      $a.parents('li').addClass('active');
    }

    $a.parent().addClass('active');
  }

});


},{"../../utils/request.js":7}],11:[function(require,module,exports){
/**
 * /public/views/types/types.js
 *
 * @description: Database view
 * @author: Chris Young (young.c.5690@gmail.com)
 * @created: September 17th 2015
 */

var Request = require('../../utils/request.js');

var Types = require('../../collections/types.js');

module.exports = Backbone.View.extend({

  /**
   * Types.initialize()
   * @description: Loads view template
   * @param: {Object} options
   */
  initialize: function (options) {
    var that = this;

    _.extend(this, options);

    this.types = new Types();

    this.errorTemplate = _.template(this.parent.ui.$errorTemplate.html());
    this.loadingTemplate = _.template(this.parent.ui.$loadingTemplate.html());

    new Request({
      url: 'views/types/types.tmpl',
      callback: function (error, body) {
        if (!error) {
          that.template = _.template(body);
        }

        that.render();
      }
    });
  },

  /**
   * Types.setUiElements()
   * @description: Gets DOM references for view elements
   */
  setUiElements: function () {
    this.ui = {
      $pageLoading: $('#type-page-loading'),
      $tableWrapper: $('#type-content div.table-wrapper'),
      $contentBox: $('#content div.box')
    };
  },

  /**
   * Types.render()
   * @description: Draws the view
   */
  render: function () {
    var that = this;

    if (!this.template) {
      return this.$el.html(this.errorTemplate());
    }

    if (!this.types.length) {
      this.$el.html(this.loadingTemplate());
    } else {
      this.ui.$pageLoading.removeClass('hidden');
    }

    this.types.on('error sync', function (error) {
      if (event.type === 'error') {
        return that.$el.html(that.errorTemplate());
      }

      that.$el.html(that.template({ types: that.types }));
      that.setUiElements();

      that.resize()
      $(window).resize(_.bind(that.resize, that));
    });

    this.types.fetch();
  },

  /**
   * events
   * @description: Declares view click events
   */
  events: {
    'click #types-content a.sort-link': 'sort'
  },

  /**
   * Types.resize()
   * @description: Resizes the table wrapper on window resize
   */
  resize: function () {
    this.ui.$tableWrapper.css('max-height', this.ui.$contentBox.height());
  },

  /**
   * Database.sort()
   * @description: Reorders the collection based on sort method
   */
  sort: function (event) {
    var $target = $(event.target).parents('a.sort-link');

    event.preventDefault();

    this.types.sortMethod.key = $target.data('key');
    this.types.sortMethod.direction = $target.find('span.sort-icon').hasClass('fa-sort-down') ? 1 : -1;
    this.types.sort();

    this.render();
  }

});


},{"../../collections/types.js":3,"../../utils/request.js":7}],12:[function(require,module,exports){
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

        if (malwares) {
          that.uploadMalwares(malwares);
        }
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
    var that = this,
        rows = file.split('\n'),
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

        showModal('Info', 'The malwares uploaded succesfully.\nYou can now view the amount of each malware type on the Types page.');
      }
    });
  }

});


},{"../../collections/malwares.js":2,"../../utils/modal.js":6,"../../utils/request.js":7}]},{},[1])


//# sourceMappingURL=bundle.js.map