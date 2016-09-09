DROP SCHEMA IF EXISTS `apg_challenge`;
CREATE SCHEMA IF NOT EXISTS `apg_challenge` DEFAULT CHARACTER SET utf8;
USE `apg_challenge`;

DROP TABLE IF EXISTS `apg_challenge`.`type`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`type` (
  `typeId` VARCHAR(64) NOT NULL UNIQUE,
  `classificationType` VARCHAR(64) NULL UNIQUE,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`typeId`)
);

DROP TABLE IF EXISTS `apg_challenge`.`malware`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`malware` (
  `malwareId` VARCHAR(64) NOT NULL UNIQUE,
  `md5` VARCHAR(64) NOT NULL UNIQUE,
  `classificationName` VARCHAR(64) NULL,
  `fileSize` VARCHAR(64) NULL,
  `fileType` VARCHAR(64) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`malwareId`)
);

DROP TABLE IF EXISTS `apg_challenge`.`malwareType`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`malwareType` (
  `malwareId` VARCHAR(64) NOT NULL,
  `typeId` VARCHAR(64) NOT NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `malwareType` PRIMARY KEY (`typeId`, `malwareId` DESC),
  FOREIGN KEY (`malwareId`) REFERENCES `apg_challenge`.`malware` (`malwareId`),
  FOREIGN KEY (`typeId`) REFERENCES `apg_challenge`.`type` (`typeId`)
);

