/*
	Author: Kyle Berger
	Date: 8/8/2016
	Email: Kyle.msn@live.com
	*/

	var app = angular.module("inputApp", []); 
	app.controller("InputCtrl", function($scope,networkService) {

		var myThis = this;

	//used to make asynchronous calls to upload csv files
	myThis.progress = 100;
	myThis.message = "";

	//default value for data object
	myThis.data = "empty";

	//used for summary panel progress bars
	myThis.colors = ["#227FB0","#7CB854","#F2B701","#E57D04","#B32E37","#5C4399"];

	//used for bar chart
	var barData = {
		labels: [],
		series: []
	};
	var barOptions = {
		seriesBarDistance: 10
	};
	var barResponsiveOptions = [
	['screen and (max-width: 640px)', {
		seriesBarDistance: 5,
		axisX: {
			labelInterpolationFnc: function (value) {
				return value[0];
			}
		}
	}]
	];
	//Assign values to BarData and draw bars on screen
	var makeBars = function(){
		//update labels and series with new data
		barData.labels = myThis.data.bar_names;
		barData.series[0] = myThis.data.bar_values;

		//draw the bars onto the screen
		new Chartist.Bar('.bar', barData, barOptions, barResponsiveOptions);
	}

	//used for pie chart
	var pieData = {
		labels: [],
		series: []
	};
	var sum = function(a, b) { return a + b };
	var pieOptions = {
		labelInterpolationFnc: function(value) {
			return value[0];
		}
	};
	var pieResponsiveOptions = [
	['screen and (min-width: 640px)', {
		chartPadding: 30,
		labelOffset: 100,
		labelDirection: 'explode',
		labelInterpolationFnc: function(value) {
			return value;
		}
	}],
	['screen and (min-width: 1024px)', {
		labelOffset: 80,
		chartPadding: 20
	}]
	];
	//Assign values to pieData and draw pie on screen
	var makePie = function(){
		//update labels and series with new data
		pieData.labels = myThis.data.pie_names;
		pieData.series = myThis.data.pie_values;

		//draw the pie chart on the screen
		new Chartist.Pie('.pie', pieData, pieOptions, pieResponsiveOptions);
	}


	//main call to get data from the database
	var getInput = function(){

		//call to the database and store a promise to know when call is completed
		var promise = networkService.getHttpGetPromise(window.location.href + "challenge/rest/getInput/");
		promise.then(
			function(successData) {
				setTimeout(function(){

            		//update data
            		myThis.data = successData;

					//update bar and pie chart if data exists
					if(myThis.data != "empty"){
						makePie();
						makeBars();
					}

					//finish upload progress bar
					myThis.progress = 100;
					myThis.message = "";

	                //tell angular the progress bar has finished loading
	                $scope.$apply(function(){
	                	$scope.loading = false;
	                });
	            }, 500);
			},
			function(errorData) {
				console.log(errorData);
			}
			);
	}

	//called to upload data into the database
	$("#fileInfo").on("submit", function(e) {

		//prevent page redirect
		e.preventDefault();

		//create FormData object to store the file in
		var formData = new FormData();
		formData.append('file', $('#fileSelect')[0].files[0]);

		//send the data to the backend
		$.ajax({
			url: $(this).attr("action"),
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			beforeSend: function() {

            	//update the upload progress bar
            	myThis.progress = 33;
            	myThis.message = "Uploading File";

                //tell angular about the progress bar update
                $scope.$apply(function(){
                	$scope.loading = false;
                });
            },
            success: function(data) {
            	setTimeout(function(){

            		//update the upload progress bar
            		myThis.progress = 66;
            		myThis.message = "Fetching Data";

                	//tell angular about the progress bar update
                	$scope.$apply(function(){
                		$scope.loading = false;
                	});

                	//fetch new data
                	getInput();
                }, 500);
            }
        });
	});


	//called to initialize the application
	var init = function(){

		//get current data in database
		getInput();
	}

	init();
});
	app.service('networkService',['$http', '$q',
		function($http, $q) {

			//if the call fails, we want to reject the response
			var rejectResponse = function(deferred, data) {
				deferred.reject(data);
			};

			//used to create a promise from an http call
			var getHttpPromise = function(http) {
				var deferred = $q.defer();

				http.then(
                    // success
                    function(response) {
                    	if (response.status != 200 ||
                    		(response.data != null && response.data.status && response.data.status != "SUCCESS")) {
                    		rejectResponse(deferred, response.data);
                    }
                    else {
                    	deferred.resolve(response.data);
                    }
                },
                    // error
                    function(response) {
                    	rejectResponse(deferred, response.data);
                    }
                    );

				return deferred.promise;
			};

			//used for getting data from the database
			this.getHttpGetPromise = function(url) {
				var tempHttp = $http.get(url);
				return getHttpPromise(tempHttp);
			};

			//used for posting data to the database
			this.getHttpPostPromise = function(url) {
				var tempHttp = $http({
					method  : 'POST',
					url     : url,
					data    : $('#fileInfo').serialize()
				});
				return getHttpPromise(tempHttp);
			};
		}
		]
		);