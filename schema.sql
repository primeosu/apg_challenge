DROP SCHEMA IF EXISTS `apg_challenge`;
CREATE SCHEMA IF NOT EXISTS `apg_challenge` DEFAULT CHARACTER SET utf8;
USE `apg_challenge`;

DROP TABLE IF EXISTS `apg_challenge`.`malware`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`malware` (
  `id` VARCHAR(64) NOT NULL UNIQUE,
  `md5` VARCHAR(64) NOT NULL UNIQUE,
  `classificationName` VARCHAR(64) NULL,
  `classificationType` VARCHAR(64) NULL,
  `fileSize` VARCHAR(64) NULL,
  `fileType` VARCHAR(64) NULL,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `apg_challenge`.`type`;
CREATE TABLE IF NOT EXISTS `apg_challenge`.`type` (
  `id` VARCHAR(64) NOT NULL UNIQUE,
  `classificationType` VARCHAR(64) NULL UNIQUE,
  `amount` INTEGER DEFAULT 0,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

