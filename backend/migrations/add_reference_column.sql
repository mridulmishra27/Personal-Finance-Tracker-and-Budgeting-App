-- Migration: Add reference column to transactions table
-- Run this SQL script if the automatic migration doesn't work

USE financeapp;

-- Check if column exists before adding (MySQL doesn't support IF NOT EXISTS for ALTER TABLE)
-- If you get an error that the column already exists, that's fine - it means it's already there

ALTER TABLE transactions 
ADD COLUMN reference VARCHAR(255) DEFAULT NULL AFTER amount;
