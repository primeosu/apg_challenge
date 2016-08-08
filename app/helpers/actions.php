<?php

/*  actions
 *  Performs GET operations to query the database
 *  Returns HTML string data response (i.e. "<table><tr></tr></table>") to display on view
 *
*/

// Include database class
include_once("queries.class.php");

$query = new queries();
$query->filter = json_decode($_GET['q'], true);
$records = $query->getRecords();

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

?>
