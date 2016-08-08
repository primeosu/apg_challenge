<?php

// Include database class
include_once("../assets/php/database.php");

class queries {

      private $DB;
      private $records;
      private $filter;

      public function __construct() {
            // Define global constants
            define('DATABASE_NAME', 'malware');
            define('DATABASE_USER', 'user');
            define('DATABASE_PASS', 'password');
            define('DATABASE_HOST', 'localhost');
            // create DB object
            $this->DB = new DBPDO();
      }

      public function __get($property) {
            if (property_exists($this, $property)) {
              return $this->$property;
            }
      }

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
            $this->records = $this->DB->fetchAll("SELECT * FROM malware WHERE MD5 LIKE '%$this->filter%'");
            return $this->records;
      }

}
?>
