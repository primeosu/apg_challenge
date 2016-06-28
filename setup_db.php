<?php
// Create connection
$conn = new mysqli("localhost", "root", "");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
// Create database
$sql = "CREATE DATABASE apg_challenge";

if ($conn->query($sql) === TRUE) {
    echo "Database apg_challenge created successfully.";
} 
else {
    echo "Error creating database: " . $conn->error;
  }
$conn->close();
?>

<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "apg_challenge");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// sql to create table
$sql = "CREATE TABLE malware (
		MD5 VARCHAR(50) PRIMARY KEY,
		ClassificationName CHAR(25) NOT NULL,
		ClassificationType CHAR(25) NOT NULL,
		Size INT NOT NULL,
		FileType CHAR(25) NOT NULL)";

if ($conn->query($sql) === TRUE) {
    echo " Table malware created successfully.";
} else {
    echo "Error creating table: " . $conn->error;
}
$conn->close();
?>