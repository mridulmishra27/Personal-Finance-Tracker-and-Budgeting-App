-- Basic schema for MySQL migration
CREATE DATABASE IF NOT EXISTS financeapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE financeapp;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(50) DEFAULT 'Not Selected',
  dob VARCHAR(50) DEFAULT 'Not Selected',
  phone VARCHAR(50) DEFAULT '',
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  image TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  reference VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_date (user_id, transaction_date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Migration: Add reference column if table already exists (run manually if needed)
-- ALTER TABLE transactions ADD COLUMN reference VARCHAR(255) DEFAULT NULL;

