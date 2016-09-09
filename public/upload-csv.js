$(function() {
     
    // draw initial table when page loads
    $.ajax({ 
        url: "/draw",
        type: "GET",
        processData: true,
        contentType: "JSON",
        success: function(results) {
            
            // use array of jsons to fill malware table
            console.log(results.results);
            updateMalware(results.results);
            
            // use json to fill summary table
            updateSummary(results.summary);
            
        },
        
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
    
    $("#file-upload-btn").click(function() {
        
        // reset file input value to null so that you can select
        // the same file to upload
        $("#file-upload-input").click(function() {
            $("#file-upload-input").val(null);
        });
        
        $("#file-upload-input").click();
    });
    
    $("#table-drop-btn").click(function() {
        console.log("drop clicked");
        $.ajax({ 
        url: "/drop",
        type: "DELETE",
        success: function(results) {
            
            // use array of jsons to fill malware table
            console.log(results.results);
            updateMalware(results.results);
            
            // use json to fill summary table
            updateSummary(results.summary);
            
            console.log("table dropped");
            
        },
        
        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
    });
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
                    
                    console.log("Number of duplicats: " + result.duplicates);
                    
                    $.ajax({ 
                        url: "/draw",
                        type: "GET",
                        processData: true,
                        contentType: "JSON",
                        success: function(results) {

                            // use array of jsons to fill malware table
                            updateMalware(results.results);

                            // use json to fill summary table
                            updateSummary(results.summary);
                        },
                        error: function(xhr, status, error) {
            console.log(status + ": " + error);
        }
                    });

                },
                error: function(xhr, status, error) {
            console.log(status + ": " + error);
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
            console.log(status + ": " + error);
        }
    });
}


function updateMalware(o) {
    // wipe table
            $("#results").html("");
            
            //append table heading
            //var table_header = "<thead><tr><th>MD5</th><th>Classification Name</th><th>Classification Type</th><th>Size</th><th>File Type</th></tr></thead>";
            //$("#results").append(table_header);
               
            // append request results to div#results(
    
            if (o.length <= 0) {
                $("#results").append("<tr><td colspan=100%>Please upload a csv file to populate this table</td></tr>");
            }
    
        else {
            for (var i = 0; i < o.length; i++) {
                var row = "<tr><td>" + o[i].MD5 + "</td><td>" + o[i].ClassificationName + "</td><td>" + o[i].ClassificationType + "</td><td>" + o[i].Size + "</td><td>" + o[i].FileType + "</td></tr>";
                $("#results").append(row);    
            }
            }
}

function updateSummary(o) {
    
    // draw pie chart
    draw(o);
    
    // draw summary table
    $("#summary").html("");
    $("#summary").append("<thead><tr><th colspan=100%>Summary</th></tr></thead> <tr><td colspan=100%><svg id='test1' class='mypiechart'></svg></td></tr>");
            
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            $("#summary").append("<tr><td>" + key + "</td><td>" + o[key] + "</td></tr>");
        }
    }    
};

// PI CHART DRAW
function clearPie() {
    $(".mypiechart").html("");    
}
    
function draw(o) {
        
    // wipe existing pie chart 
    $(".mypiechart").html("");
    
    // create testdata2
    var testdata2 = [];
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            testdata2.push({key: key, y: o[key]});
        }
    }  

    var height = 350;
    var width = 350;

    nv.addGraph(function() {
        var chart = nv.models.pieChart()
            .x(function(d) { return d.key })
            .y(function(d) { return d.y })
            .width(width)
            .height(height)
            .showLegend(false);

        d3.select("#test1")
            .datum(testdata2)
            .transition().duration(1200)
            .attr('width', width)
            .attr('height', height)
            .call(chart);

        return chart;
    });

}