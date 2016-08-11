<?php

/*  query
 *  Performs GET operations to query the database
 *  Returns HTML string data response (i.e. "<table><tr></tr></table>") to display on view
 *
*/

// Include database class
include_once("queries.class.php");

// new query object
$query = new queries();

// set filter attribute in object
$query->filter = json_decode($_GET['q'], true);

// get all records
$records = $query->getRecords();

// unique counts
$unique_name = $query->countUniqueRecords("classification_name");
$unique_type = $query->countUniqueRecords("classification_type");
$unique_file = $query->countUniqueRecords("filetype");


// print table on DOM
echo("<table>
        <tr class='header'>
          <td>MD5</td>
          <td>ClassificationName <small>[$unique_name unique]</small></td>
          <td>ClassificationType <small>[$unique_type unique]</small></td>
          <td>Size</td>
          <td>FileType <small>[$unique_file unique]</small></td>
        </tr>");

// foreach record
foreach ($records as $key => $value) {

      // get foreign key text value for each record to display on view
      $value['classification_name_fk'] = $query->getForeignKeys("id", "classification_name", $value['classification_name_fk']);
      $value['classification_type_fk'] = $query->getForeignKeys("id", "classification_type", $value['classification_type_fk']);
      $value['filetype_fk'] = $query->getForeignKeys("id", "filetype", $value['filetype_fk']);

      // grid formatting
      $class = "blank";

      if ($key % 2 == 0) {
          $class = "highlight";
      }

      // print record
      echo("<tr class='{$class}'>
              <td>{$value['MD5']}</td>
              <td>{$value['classification_name_fk']['title']}</td>
              <td>{$value['classification_type_fk']['title']}</td>
              <td>{$value['size']}</td>
              <td>{$value['filetype_fk']['title']}</td>
            </tr>");
}

// closing tag
echo("</table>");

?>
