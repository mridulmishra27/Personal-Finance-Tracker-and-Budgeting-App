import db from '../config/mysql.js';

const addReferenceColumn = async () => {
  try {
    // Check if reference column exists
    const [columns] = await db.query(
      `SELECT COLUMN_NAME 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = DATABASE() 
       AND TABLE_NAME = 'transactions' 
       AND COLUMN_NAME = 'reference'`
    );

    if (columns.length === 0) {
      // Column doesn't exist, add it
      await db.query(
        'ALTER TABLE transactions ADD COLUMN reference VARCHAR(255) DEFAULT NULL AFTER amount'
      );
      console.log('✓ Added reference column to transactions table');
    } else {
      console.log('✓ Reference column already exists');
    }
  } catch (error) {
    console.error('Error adding reference column:', error.message);
    throw error;
  }
};

export default addReferenceColumn;
