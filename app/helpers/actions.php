<?php

/*  actions
 *  Performs GET operations to query the database
 *  Returns HTML string data response (i.e. "<table><tr></tr></table>") to display on view
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

// Get the query from request
$query = json_decode($_GET['q'], true);

var_dump($query);

// default records
$records = null;

// call performQuery operation
performQuery();

/*  Perform query operation
*/
function performQuery() {
      // get global variable
      global $DB;

      // Initial records
      $records = $DB->fetchAll("SELECT * FROM malware");
    
      // print table on DOM
      echo("<table>
              <tr class='header'>
                <td>MD5</td>
                <td>ClassificationName <small>[3 unique]</small></td>
                <td>ClassificationType <small>[4 unique]</small></td>
                <td>Size</td>
                <td>FileType <small>[5 unique]</small></td>
              </tr>");

      // foreach record
      foreach ($records as $key => $value) {

            // grid formatting
            $class = "blank";

            if ($key % 2 == 0) {
                $class = "highlight";
            }

            // print record
            echo("<tr class='{$class}'>
                    <td>{$value['MD5']}</td>
                    <td>{$value['classification_name_fk']}</td>
                    <td>{$value['classification_type_fk']}</td>
                    <td>{$value['size']}</td>
                    <td>{$value['filetype_fk']}</td>
                  </tr>");
      }

      // closing tag
      echo("</table>");
}

?>
