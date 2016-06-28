<!--Apg Challenge by Vivek Menon-->
<?php
/*Connecting to mysql database.*/
$conn = mysql_connect("localhost", "root", "") or die("Unable to Connect");
    mysql_select_db("apg_challenge", $conn);
/*When csv file is uploaded.*/
if(isset($_POST['submit'])){  
    $i=0; 
    $handle = fopen($_FILES['file']['tmp_name'], "r");                  //Opens CSV file
    /* Once file is opened, fgetcsv function to parse the file row by row and uploads the data into relational database. */
    while (($fileop = fgetcsv($handle, 1000, ",")) !== false) {
      if($i>0){
          $sql = mysql_query("INSERT INTO malware (MD5, ClassificationName, ClassificationType, Size, FileType) 
                  VALUES ('$fileop[0]','$fileop[1]','$fileop[2]','$fileop[3]','$fileop[4]')");   
        }
        $i++;       
   }
       fclose($handle);
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href ="styles.css">

  </head>
  <body>
          <section id="page-header">
            <div class="col-md-10 ">
                  <h1 style ="font-size: 40px;">APG Challenge</h1>
              </div>
            </section>
       <!-- Contains the form and the table for data -->
            <div class="container">              
              <div class="wrapper">
                <div class="sub-container">
                      <h2 style ="font-size: 3vw;" > Input your Malware files here</h2>
                    </div>
                      <div class="row">
                          <form class= "form-inline" action="index.php" method="post" enctype= "multipart/form-data">
                            <div class="col-xs-6" style =""> 
                          <div class="form-group"> 
                              <h3 style ="font-size: 2vw;"><strong>File input</strong></h3>
                              <input type="file" name ="file" style ="font-size: 2vw"/>
                              <p class="help-block" style ="font-size: 2vw;"><small>Input CSV files here.</small></p>
                              <button type="submit" name="submit" value ="Submit" class="btn btn-primary">Submit</button>
                            </div>
                          </div> 
                        <div class="col-xs-6">
                        <div class="packet">
                              <h4 style ="font-size: 1.8vw;">Table below displays the total amount of each different ClassificationType in the database.<h4>
                        </div>
                      </div>   
                        </form>                     
                  </div>
                  <div class = "table-responsive" style= "padding: 10px;">
                       <table class = "table table-bordered" style= "max-with: auto;" >
                        <thead>
                             <tr>
                                <th>Different ClassificationTypes</th>
                                <th>Total # ClassificationTypes</th>
                              </tr>
                          </thead>
                           <tbody>   
                             <?php 
                                  /* Query the database to output the total number of different ClassificationType. */                                  
                                   $result = mysql_query("SELECT ClassificationType, COUNT(ClassificationType) FROM malware 
                                      GROUP BY ClassificationType ");
                                         if($result === FALSE) { 
                                            die(mysql_error()); // error handling
                                             }
                                        $i = 0;
                                    while ($row = mysql_fetch_array($result)) {                                       
                                       echo "<tr>";
                                       echo "<td>".$row['ClassificationType']."</td>";
                                       echo "<td>".$row['COUNT(ClassificationType)']."</td>";
                                       echo "</tr>";
                                        $i++;
                                   }
                              ?>
                              </tbody>
                             </table> 
                           </div>               
                          </div>
                         </div>
            <!-- footer -->
           <footer style = " margin-left: 5em;">
              <p>   © 2016 Apg Challenge-Vivek Menon.</p>
            </footer>        
    <!-- jQuery first, then Bootstrap JS. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>