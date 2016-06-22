$(document).ready(function() {
	
	// Loads table with given classification type data
	function updateTable(data) {
		$('#table').bootstrapTable("load", data);
	}
	
	// Bootstrap Table boilerplate
	$('#table').bootstrapTable({
	    columns: [{
	        field: 'ClassificationType',
	        title: 'Classification Type'
	    }, {
	        field: 'Total',
	        title: 'Total'
	    }],
	    data: [{}]
	});
  
  	// Populate table with data on document ready
  	$.ajax({
	    url: "/api/classificationType",
	    type: 'GET',
	    success: function(res) {
	        console.log(res);
	        updateTable(res);
	    }
	});

	// Submit file data to server on form submission
	$("#uploadForm").submit(function(e) {
		resetAlerts();
	    $.ajax({
		     type: "POST",
		     url: "/api/malwareData",
		     data: new FormData(this),
		     processData: false,
		     contentType: false,
		     success: function(data)
		     {
		     	// Get newly uploaded data and update table
		        $.ajax({
		            url: "/api/classificationType",
		            type: 'GET',
		            success: function(res) {
		                updateTable(res);
		                alertSuccess();
		            }
	        	});
		     },
		     error: function(err)
		     {
		        alertError()
		     }
	    });
	    e.preventDefault();
	});

	/* Show error alert */
	function alertError() {
	    $('.alert-danger').show();
	}

	/* Show success alert */
	function alertSuccess() {
	    $('.alert-success').show();
	}

	/* Show success alert */
	function resetAlerts() {
	    $('.alert-success').hide();
	    $('.alert-danger').hide();
	}

});
