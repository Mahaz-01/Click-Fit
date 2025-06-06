-- Create Database
CREATE DATABASE click_fit;
USE click_fit;

-- Create Users Table
CREATE TABLE users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);

-- Create Stored Procedure
DELIMITER //
CREATE PROCEDURE addUser(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, 1);
END //
DELIMITER ;

-- Call Stored Procedure to Insert Sample User
CALL addUser('test@example.com', 'hashed_password', 'member');