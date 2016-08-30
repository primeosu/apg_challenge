<?php
/**********************
*Jack Lopez     
*Intel Interview Submission
*8-30-16
************************/
$servername = "192.185.4.143";
$username = "er47217";
$password = "8v(uzIvDdv3t";

$conn = mysql_connect($servername, $username, $password) or die(mysql_error());

mysql_select_db("er47217_intel-project",$conn);

/*Check if file has been posted and locate the temporary location of the file on the servert*/
if(isset($_POST['upload']))
{   
    $file = $_FILES['csv']['tmp_name'];        
    
    /*open the file and read it*/
    $handle = fopen($file, "r");

    /*use this to clear the data before each load */
    mysql_query("DELETE FROM csv_import");
    mysql_query("ALTER TABLE csv_import AUTO_INCREMENT = 1");

    /*Loop through the file and grab all the columns, place in variables so that you can inject into sql insert*/
    $flag = true;
    while(($fileop = fgetcsv($handle,250, ",")) !== false)
    {   
        if($flag) {$flag = false; continue;}
        $MD5 = $fileop[0];
        $ClassificationName = $fileop[1];
        $ClassificationType = $fileop[2];
        $Size = $fileop[3];
        $FileType = $fileop[4];

        $sql = mysql_query("INSERT INTO csv_import(MD5,ClassificationName,ClassificationType,Size,FileType) VALUES ('$MD5', '$ClassificationName','$ClassificationType','$Size','$FileType')");
    }

    /*Go through DB and get all fields to place in table in the view*/
    $select = mysql_query("SELECT MD5,ClassificationName,ClassificationType,Size,FileType FROM csv_import");

    /*Grab only the Classification Type, in order to search for unique types*/
    $classificationTypeCount = mysql_query("SELECT ClassificationType FROM csv_import");
    $array = array();

    /*place data in an array so that you can close the file*/
    while($row_classificationType = mysql_fetch_array($classificationTypeCount)) {array_push($array, $row_classificationType[0]);}

    fclose($handle);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
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
              <h1>Success</h1>
              <p>
                Your <mark>.csv</mark> file has been added to a Database. View the details below. 
              </p> 
            </div>
            <div class="col-lg-2"></div>
          </div>
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-8">
              <div class="table-responsive" style="max-height:600px; overflow:auto;">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>MD5</th>
                        <th>Classification Name</th>
                        <th>Classification Type</th>
                        <th>Size</th>
                        <th>FileType</th>
                      </tr>
                    </thead>
                    <tbody>
                        <!--Display data in DB sent from CSV-->
                    <?php while($row_users = mysql_fetch_array($select)){?>    
                      <tr>
                        <td><?php echo($row_users[0]);?></td>
                        <td><?php echo($row_users[1]);?></td>
                        <td><?php echo($row_users[2]);?></td>
                        <td><?php echo($row_users[3]);?></td>
                        <td><?php echo($row_users[4]);?></td>
                      </tr>
                    <?php } ?>
                    </tbody>
                  </table>
              </div>
              <div class="row">
                <div class="col-lg-6">
                    <!--parse through array and find unique types to show as an int.-->
                    <p># of unique Classification Types = <b><?php echo (count(array_count_values($array))); ?></b></p>
                </div>
                <div class="col-lg-6">
                    <a href="intelchallenge.php" style="float:right;"><button class="btn btn-default" name="return"><b>Return</b></button></a>
                </div>
              </div>
            </div>
            <div class="col-lg-2"></div>
          </div>
        </div>
    </body>
</html>