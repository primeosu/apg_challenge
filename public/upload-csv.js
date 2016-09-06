$("#file-upload-btn").click(function() {
    
    var files = $("#file-upload-input").get(0).files;
    
    if (files.length <= 0) {
        console.log("error");
    }
    
    else {
        
        // create ajax request
       var formData = new FormData();
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append("uploads[]", file, file.name);
        }
        
        // execute request
        $.ajax({
            
            url: "/load",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("upload success");
                csonole.log("data: " + data);
            },
            error: function(xhr, status, error) {
                console.log("There was an error: " + error);
            }
        });
    }
});