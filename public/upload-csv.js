$("#file-upload-btn").click(function() {
    
    var files = $("#file-upload-input").get(0).files;
    
    if (files.length <= 0) {
        console.log("no files chosen");
    }
    
    else {
        
        // create ajax request
       var formData = new FormData();
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append("uploads[]", file, file.name);
        }
        
        // execute request
        execute_request("/load", "POST", formData);
    }
});

function execute_request(url, operation, data) {
    
    $.ajax({ 
        url: url,
        type: operation,
        data: data,
        processData: false,
        contentType: false,
        success: function(result) {
            console.log("AJAX: success");
            console.log("data: " + result);
        },
        error: function(xhr, status, error) {
            console.log("AJAX: fail");
            console.log("There was an error: " + error);
            console.log("Status: " + status);
        }
    });
}