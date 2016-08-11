<?php

// Include database class
include_once("../assets/php/database.php");

/*  queries class
*/
class queries {

      // private class variables
      private $DB;
      private $records;
      private $filter;

      /*  Constructor function
      */
      public function __construct() {
            // Define global constants
            define('DATABASE_NAME', 'malware');
            define('DATABASE_USER', 'user');
            define('DATABASE_PASS', 'password');
            define('DATABASE_HOST', 'localhost');
            // create DB object
            $this->DB = new DBPDO();
      }

      /*  Getter function
      */
      public function __get($property) {
            if (property_exists($this, $property)) {
              return $this->$property;
            }
      }

      /*  Setter function
      */
      public function __set($property, $value) {
            if (property_exists($this, $property)) {
              $this->$property = $value;
            }
            return $this;
      }

      /*  Perform query operation
      */
      public function getRecords() {

            // Initial records
            $this->records = $this->DB->fetchAll("SELECT * FROM malware
                                                    WHERE MD5 LIKE '%$this->filter%'
                                                    OR size LIKE '%$this->filter%'");

            return $this->records;
      }

      /*  insertMalwareRecord
       *  Perform SQL to insert record
       *
       *  @param array - array of line values to insert
       *  @param array -  foreign key values
      */
      public function insertMalwareRecord($line, $foreignKeys) {

            // if name FK does not exist
            if ($foreignKeys['ClassificationName'] == "null") {
                  // insert record,
                  $this->insertForeignKeyRecord('classification_name', $line['ClassificationName']);
                  // set the returned key for reference
                  $foreignKeys['ClassificationName'] = $this->getForeignKeys('title', 'classification_name', $line['ClassificationName']);
            }

            // if tpye FK does not exist
            if ($foreignKeys['ClassificationType'] == "null") {
                  // insert record,
                  $this->insertForeignKeyRecord('classification_type', $line['ClassificationType']);
                  // set the returned key for reference
                  $foreignKeys['ClassificationType'] = $this->getForeignKeys('title', 'classification_type', $line['ClassificationType']);
            }

            // if ClassificationType FK does not exist
            if ($foreignKeys['FileType'] == "null") {
                  // insert new record,
                  $this->insertForeignKeyRecord('filetype', $line['FileType']);
                  // set the returned key for reference
                  $foreignKeys['FileType'] = $this->getForeignKeys('title', 'filetype', $line['FileType']);
            }

            // set variables for insert statement below
            $MD5 = $line['MD5'];
            $ClassificationName = $foreignKeys['ClassificationName']['id'];
            $ClassificationType = $foreignKeys['ClassificationType']['id'];
            $Size = $line['Size'];
            $FileType = $foreignKeys['FileType']['id'];

            // sql statement
            $sql = "INSERT INTO malware (MD5, classification_name_fk, classification_type_fk, size, filetype_fk)
                    VALUES ('$MD5', '$ClassificationName', '$ClassificationType', '$Size', '$FileType')";

            // Run SQL query
            $this->DB->execute($sql);
      }

      /*  insertForeignKeyRecord
       *  Perform SQL to insert record
       *
       *  @param string - table name
       *  @param string - data to insert
       *  @return insert statement values
      */
      function insertForeignKeyRecord($table, $data) {

            // sql statement
            $sql = "INSERT INTO $table (title) VALUES ('$data');";

            // Run SQL query
            $this->DB->execute($sql);
      }

      /*  getForeignKeys
       *  Return foreign key ID's for reference
       *
       *  @param string -  type of search - by "ID" or by "title"
       *  @param string -  table name to check
       *  @param string -  data to check for foreign keys
       *  @return array -  array containing foreign key ID references
      */
      function getForeignKeys($type, $table, $data) {

            // query
            $record = $this->DB->fetchAll("SELECT * FROM $table
                                      WHERE $type = '$data'");

            // if record exists? Return FK reference
            if ($record) {
                  return $record[0];
            }
            else {
                  return "null";
            }
      }

      /*  countUniqueRecords
       *  Count and return number of unique records in table
       *
       *  @param string - table name to check
       *  @return int - count of records
      */
      function countUniqueRecords($table) {
            // query
            $records = $this->DB->fetchAll("SELECT * FROM $table");
            // return count
            return count($records);
      }

}
?>
