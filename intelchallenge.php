<!DOCTYPE html>
<html lang="en">
<head>
<!--**********************
*Jack Lopez     
*Intel Interview Submission
*8-30-16
************************-->
  <title>Intel Challenge</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
    <body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
              <h1>Welcome</h1>
              <p>
                The purpose of this app is to upload a <mark>.csv</mark> file to a relational database, normailize the data and display the amount of unique Classication Types.
              </p> 
            </div>
            <div class="col-lg-2"></div>
          </div>
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
                <form class="form-horizontal" action='csv-upload.php' method='post' enctype="multipart/form-data">
                  <div class="form-group">
                    <label class="control-label col-sm-4" for="csv">File Upload(.csv):</label>
                    <div class="col-sm-4">
                      <input type="file" accept=".csv" class="form-control" name="csv" id="csv" onchange="getVal(this)"/>
                    </div>
                    <div class="col-sm-4">
                      <button type="submit" class="btn btn-default" name="upload" id="submit" disabled="true">Upload</button>
                    </div>
                  </div>
                </form>
            </div>
            <div class="col-lg-2"></div>
          </div>
        </div>
    </body>
</html>
<script>
 function getVal($this){
    $('#submit').removeAttr('disabled');
 }
</script>