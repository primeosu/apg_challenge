$(document).ready(function() {

	function updateTable(data) {
		$('#table').bootstrapTable("load", data);
	}

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
  
  	$.ajax({
	    url: "/api/classificationType",
	    type: 'GET',
	    success: function(res) {
	        console.log(res);
	        updateTable(res);
	    }
	});

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
