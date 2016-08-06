-- Create the database
-- ---------------------------
DROP DATABASE IF EXISTS malware;
CREATE DATABASE malware;

-- Select the database
-- ---------------------------
USE malware;

-- Begin creating tables
-- ---------------------------

-- Create table: callification_name
CREATE TABLE classification_name (
      id			      INT			PRIMARY KEY		AUTO_INCREMENT,
      title		      VARCHAR(50)
);

-- Create table: callification_type
CREATE TABLE classification_type (
      id			      INT			PRIMARY KEY		AUTO_INCREMENT,
      title		      VARCHAR(50)
);

-- Create table: filetype
CREATE TABLE filetype (
      id			      INT			PRIMARY KEY		AUTO_INCREMENT,
      title		      VARCHAR(50)
);

-- Create table: malware
CREATE TABLE malware (
      id			                  INT			PRIMARY KEY		AUTO_INCREMENT,
      classification_name_fk    INT,
      classification_type_fk    INT,
      size                      INT,
      filetype_fk               INT,

      CONSTRAINT malware_fk_classification_name
            FOREIGN KEY (classification_name_fk)
            references classification_name (id),

      CONSTRAINT malware_fk_classification_type
            FOREIGN KEY (classification_type_fk)
            references classification_type (id),

      CONSTRAINT malware_fk_filetype
            FOREIGN KEY (filetype_fk)
            references filetype (id)
);
