DROP TABLE IF EXISTS input;
CREATE TABLE input (
	id INT NOT NULL AUTO_INCREMENT,
	md5 BINARY(16) NOT NULL,
	classification_name VARCHAR(40) NOT NULL,
	classification_type VARCHAR(40) NOT NULL,
	size INT NOT NULL,
	file_type VARCHAR(40) NOT NULL,
	PRIMARY KEY ( id ) 
);
