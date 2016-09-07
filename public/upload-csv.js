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
        /*
        execute_request("/load", "POST", formData, false, function(result) {
            console.log("SUCCESS!!!!");
            execute_request("/draw", "GET", null, "json", function(result) {
                
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i]);    
                }
                
            });
        });
        */
        $.ajax({ 
        url: "/load",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            console.log("success 1 res: " + result); 
            console.log("success 1 len: " + result.length); 
            
            $.ajax({ 
        url: "/draw",
        type: "GET",
        processData: true,
        contentType: "JSON",
        success: function(results) {
            console.log("success 2 res: " + results.a); 
            console.log("success 2 len: " + results.length); 
        },
        error: function(xhr, status, error) {
            console.log("AJAX: fail");
            console.log("There was an error: " + error);
            console.log("Status: " + status);
        }
    });
            
        },
        error: function(xhr, status, error) {
            console.log("AJAX: fail");
            console.log("There was an error: " + error);
            console.log("Status: " + status);
        }
    });
        
    }
});

function execute_request(url, operation, data, contentType, success_callback) {
    
    $.ajax({ 
        url: url,
        type: operation,
        data: data,
        processData: true,
        contentType: contentType,
        success: success_callback(),
        error: function(xhr, status, error) {
            console.log("AJAX: fail");
            console.log("There was an error: " + error);
            console.log("Status: " + status);
        }
    });
}