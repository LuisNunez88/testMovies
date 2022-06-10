-- CreateTable
CREATE TABLE `Movies` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255) NOT NULL,
    `Year` VARCHAR(5) NOT NULL,
    `imdbID` VARCHAR(20) NOT NULL,
    `Type` VARCHAR(20) NOT NULL,
    `Poster` TEXT NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
