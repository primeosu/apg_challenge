$(function() {
     
    // draw initial table when page loads
    $.ajax({ 
        url: "/draw",
        type: "GET",
        processData: true,
        contentType: "JSON",
        success: function(results) {
            
            // wipe table
            $("#results").html("");
            
            //append table heading
            var table_header = "<thead><tr><th>MD5</th><th>Classification Name</th><th>Classification Type</th><th>Size</th><th>File Type</th></tr></thead>";
            $("#results").append(table_header);
               
            // append request results to div#results
            for (var i = 0; i < results.results.length; i++) {
                var row = "<tr><td>" + results.results[i].MD5 + "</td><td>" + results.results[i].ClassificationName + "</td><td>" + results.results[i].ClassificationType + "</td><td>" + results.results[i].Size + "</td><td>" + results.results[i].FileType + "</td></tr>";
                $("#results").append(row);    
            }
            
            // update summary table
            updateSummary(results.summary);
            
        },
        error: function(xhr, status, error) {
            console.log("AJAX: fail");
            console.log("There was an error: " + error);
            console.log("Status: " + status);
        }
    });
    
    $("#file-upload-btn").click(function() {
      
        $("#file-upload-input").click();
        
        
    });
    
    $("#file-upload-input").change(function() {
        
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

                    $.ajax({ 
                        url: "/draw",
                        type: "GET",
                        processData: true,
                        contentType: "JSON",
                        success: function(results) {

                            // wipe table
                            $("#results").html("");

                            //append table heading
                            $("#results").append("<thead><tr><th>MD5</th><th>Classification Name</th><th>Classification Type</th><th>Size</th><th>File Type</th></tr></thead>");

                            // append request results to div#results
                            for (var i = 0; i < results.results.length; i++) {
                                $("#results").append("<tr><td>" + results.results[i].MD5 + "</td><td>" + results.results[i].ClassificationName + "</td><td>" + results.results[i].ClassificationType + "</td><td>" + results.results[i].Size + "</td><td>" + results.results[i].FileType + "</td></tr>");    
                            }
                            
                            console.log(results.summary);
                            
                            $("#summary").html("");
                            $("#summary").append("<thead><tr><th>Summary</th> </tr></thead>");
                            for (var i = 0; i < results.summary.length; i++) {
                                $("#summary").append("<tr><td>Size: </td><td>" + results.summary[i].len + "</td></tr>");
                            }
                            for (var i = 0; i < 5; i++) {
                                $("#summary").append("<tr><td>key</td><td>value</td></tr>");
                            }

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

function updateSummary(o) {
    $("#summary").html("");
    $("#summary").append("<thead><tr><th>Summary</th></tr></thead>");
            
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            $("#summary").append("<tr><td>" + key + "</td><td>" + o[key] + "</td></tr>");
        }
    }    
};