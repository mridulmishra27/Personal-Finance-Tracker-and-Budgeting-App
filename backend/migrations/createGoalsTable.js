import db from '../config/mysql.js';

// Ensure goals table exists
const createGoalsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        target_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        saved_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
        target_date DATE DEFAULT NULL,
        status ENUM('active', 'completed') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✓ Goals table exists');
  } catch (error) {
    console.error('Error ensuring goals table:', error.message);
    throw error;
  }
};

export default createGoalsTable;



