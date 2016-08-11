<?php

// Include queries class
include_once("queries.class.php");

/*  processFile
 *  Processes uploaded text file, and performs data validation
 *  Inserts file contents into MySQL table via LOAD DATA INFILE query
 *
*/

// If uploaded file is valid
if(fileValidation($_FILES["file"]) == true) {
    // perform processing
    processFile($_FILES["file"]);
}
else {
    // return error
    echo "File is invalid. Please upload a .CSV file.";
}

/*  fileValidation
 *  Ensure that the file is a .txt format
 *
 *  @param Array - file metadata for processing
 *  @return boolean - file valid
*/
function fileValidation($file) {
    if ($file["type"] == "text/csv") {
        return true;
    }
    else {
        return false;
    }
}

/*  processFile
 *  Process the submitted file
 *
 *  @param Array - file for processing
*/
function processFile($file) {

    // create query object
    $query = new queries();

    // parse CSV file into a multidimensional array
    $lines = array_map('str_getcsv', file($file["tmp_name"]));  // lines[0][0] = MD5, lines[0][1] = ClassificationName, etc...

    // get header line
    $header = $lines[0];    // header[0] = "[0]=>Name, [1]=>City... etc"

    /*  alterArray
     *  Callback function to remap the array to key/value pairs for simplier processing
     *
     *  @param Array[x] - element x in lines array
     *  @param Integer - Key index for iteration
     *  @param Array[x] - element x in header array
    */
    function alterArray(&$item, $key, $header) {
        $item = array_combine($header, $item);  // $lines[0]['FileType'] = "FileType", $lines[1]['FileType'] = "exe", etc...
    }

    // use array_walk function to remap the array, using the alterArray callback function above to set key/value pairs
    array_walk($lines, 'alterArray', $header);

    // for each line
    foreach ($lines as $key => $line) {

          // reset foreign keys for each new line
          $foreignKeys = null;

          // ignore first line
          if ($key !== 0) {
                // get foreign key references
                $foreignKeys['ClassificationName'] = $query->getForeignKeys("title", "classification_name", $line['ClassificationName']);
                $foreignKeys['ClassificationType'] = $query->getForeignKeys("title", "classification_type", $line['ClassificationType']);
                $foreignKeys['FileType'] = $query->getForeignKeys("title", "filetype", $line['FileType']);

                // call insert malware record function
                $query->insertMalwareRecord($line, $foreignKeys);
          }
    }

    // redirect message
    echo("Upload complete... Redirecting.");

    // Complete? redirect to display page
    header("Location: ../views/display.php");
}

?>
