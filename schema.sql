DROP SCHEMA IF EXISTS `apg_challenge`;
CREATE SCHEMA IF NOT EXISTS `apg_challenge` DEFAULT CHARACTER SET utf8;
USE `apg_challenge`;

DROP TABLE IF EXISTS `apg_challenge`.`malware`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`malware` (
  `md5` VARCHAR(64) NULL,
  `classificationName` VARCHAR(64) NULL,
  `classificationType` VARCHAR(64) NULL,
  `fileSize` VARCHAR(64) NULL,
  `fileType` VARCHAR(64) NULL,
  `created` TIMESTAMP NULL
);

