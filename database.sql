CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

-- Create the main users table to store common information for both customers and owners
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(15) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `address` TEXT NOT NULL,
  `pincode` VARCHAR(10) NOT NULL,
  `role` ENUM('customer', 'owner') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the owners table for information specific to pharmacy owners
CREATE TABLE `owners` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `shop_name` VARCHAR(255) NOT NULL,
  `license_number` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create the medicines table to store inventory for pharmacy owners
CREATE TABLE `medicines` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `owner_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `discount` INT DEFAULT 0,
  `stock` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`owner_id`) REFERENCES `owners`(`id`) ON DELETE CASCADE
);