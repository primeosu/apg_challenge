<?php
/**
 * 	Data Handler for CVS Parser
 *
 *	@author 	Sang Lee <sang@sangminelee.me>
 *	@copyright 	Intel Security Programming Challenge 2016
 *
 */

define("HOST", "localhost");
define("USER", "adminKpy9lDN");
define("PASS", "edLTqyMKT3gQ");
define("DB_NAME", "demo");

$link = mysqli_connect(HOST, USER, PASS) or die ("Could not connect to mysql"); 
mysqli_select_db($link, DB_NAME) or die ("No database");

$csv_mimetypes = array(
    'text/csv',
    'text/plain',
    'application/csv',
    'text/comma-separated-values',
    'application/excel',
    'application/vnd.ms-excel',
    'application/vnd.msexcel',
    'text/anytext',
    'application/octet-stream',
    'application/txt',
);

if(isset($_POST["delete"])) {
	$sql = "TRUNCATE Malware_d;";
	$result = mysqli_query($link, $sql);
	http_response_code(200);
} else if (isset($_GET["reload"])) {
	$sql = "SELECT ClassificationType, count(ClassificationType) AS Amount 
			FROM Malware_d 
			GROUP BY ClassificationType
			ORDER BY Amount DESC;";
	$result = mysqli_query($link, $sql);

	if($result) {
		$arr = array();
	    while($row = mysqli_fetch_assoc($result)) {
	        $arr[] = $row;
	    }
		http_response_code(200);
		echo json_encode($arr);
	}
} else if($_FILES && $_FILES['file']['tmp_name'] && in_array($_FILES['file']['type'], $csv_mimetypes)) {
	$requiredHeaders = array('MD5', 'ClassificationName', 'ClassificationType', 'Size', 'FileType'); 
	
	$fileContent = file_get_contents($_FILES['file']['tmp_name']);
	$sql = "";
	$separator = "\n";
	$line = strtok($fileContent, $separator);
	$foundHeaders = str_getcsv(trim($line), ',', '"');

	if($foundHeaders == $requiredHeaders) {
			while ($line !== false) {
			    $line = strtok($separator);
			    $data = str_getcsv($line, ",");

			    if(count($data) == 5 && $sql = $link->prepare('INSERT IGNORE INTO `Malware_d` VALUES (?, ?, ?, ?, ?)')) {
			    	$sql->bind_param('sssis', $data[0], $data[1], $data[2], $data[3], $data[4]);
			    	if(!$sql->execute()) {
			    		echo "DB Error, could not query the database\n";
					    echo 'MySQL Error: ' . $sql->error;
					    exit;
			    	}
			    }
			}
			http_response_code(200);
	} else {
		http_response_code(400);
	}
}

?>
