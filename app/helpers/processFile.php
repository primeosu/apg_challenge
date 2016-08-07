<?php

/*  processFile
 *  Processes uploaded text file, and performs data validation
 *  Inserts file contents into MySQL table via LOAD DATA INFILE query
 *
*/

// Define global constants
define('DATABASE_NAME', 'malware');
define('DATABASE_USER', 'user');
define('DATABASE_PASS', 'password');
define('DATABASE_HOST', 'localhost');

// Include database class
include_once("../assets/php/database.php");

// Create new database object
$DB = new DBPDO();

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
                $foreignKeys['ClassificationName'] = getForeignKeys("classification_name", $line['ClassificationName']);
                $foreignKeys['ClassificationType'] = getForeignKeys("classification_type", $line['ClassificationType']);
                $foreignKeys['FileType'] = getForeignKeys("filetype", $line['FileType']);

                // call insert malware record function
                insertMalwareRecord($line, $foreignKeys);
          }
    }

    // redirect message
    echo("Upload complete... Redirecting.");

    // Complete? Re-direct to display page
    header("Location: ../views/display.php");
}

/*  insertMalwareRecord
 *  Perform SQL to insert record
 *
 *  @param array - array of line values to insert
 *  @param array -  foreign key values
*/
function insertMalwareRecord($line, $foreignKeys) {
      // access global DB variable
      global $DB;

      // if name FK does not exist
      if ($foreignKeys['ClassificationName'] == "null") {
            // insert record,
            insertForeignKeyRecord('classification_name', $line['ClassificationName']);
            // set the returned key for reference
            $foreignKeys['ClassificationName'] = getForeignKeys('classification_name', $line['ClassificationName']);
      }

      // if tpye FK does not exist
      if ($foreignKeys['ClassificationType'] == "null") {
            // insert record,
            insertForeignKeyRecord('classification_type', $line['ClassificationType']);
            // set the returned key for reference
            $foreignKeys['ClassificationType'] = getForeignKeys('classification_type', $line['ClassificationType']);
      }

      // if ClassificationType FK does not exist
      if ($foreignKeys['FileType'] == "null") {
            // insert new record,
            insertForeignKeyRecord('filetype', $line['FileType']);
            // set the returned key for reference
            $foreignKeys['FileType'] = getForeignKeys('filetype', $line['FileType']);
      }

      // set variables for insert statement below
      $MD5 = $line['MD5'];
      $ClassificationName = $foreignKeys['ClassificationName'];
      $ClassificationType = $foreignKeys['ClassificationType'];
      $Size = $line['Size'];
      $FileType = $foreignKeys['FileType'];

      // sql statement
      $sql = "INSERT INTO malware (MD5, classification_name_fk, classification_type_fk, size, filetype_fk)
              VALUES ('$MD5', '$ClassificationName', '$ClassificationType', '$Size', '$FileType')";

      // Run SQL query
      $DB->execute($sql);
}

/*  insertForeignKeyRecord
 *  Perform SQL to insert record
 *
 *  @param string - table name
 *  @param string - data to insert
 *  @return insert statement values
*/
function insertForeignKeyRecord($table, $data) {
      // access global DB variable
      global $DB;

      // sql statement
      $sql = "INSERT INTO $table (title) VALUES ('$data');";

      // Run SQL query
      $DB->execute($sql);
}


/*  getForeignKeys
 *  Return foreign key ID's for reference
 *
 *  @param string - table name to check
 *  @param string -  data to check for foreign keys
 *  @return array - array containing foreign key ID references
*/
function getForeignKeys($table, $data) {
      // access global DB variable
      global $DB;

      // classification name
      $record = $DB->fetchAll("SELECT * FROM $table
                                WHERE title = '$data'");

      // if record exists? Return FK reference
      if ($record) {
            return $record[0]['id'];
      }
      else {
            return "null";
      }
}

?>
