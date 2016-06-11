CREATE TABLE threats(MD5 VARCHAR(36) NOT NULL,
    ClassificationName VARCHAR(20) NOT NULL,
    ClassificationType VARCHAR(20) NOT NULL, 
    Size INT NOT NULL, 
    FileType VARCHAR(10) NOT NULL,
    PRIMARY KEY (MD5)
);
