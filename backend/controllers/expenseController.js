import db from '../config/mysql.js';

const parseDateFilters = (query) => {
  const { frequency = 'all', startDate, endDate } = query;
  const now = new Date();
  let fromDate = null;
  let toDate = null;

  // Allow client to request a fixed range
  if (frequency === 'custom' && startDate && endDate) {
    fromDate = new Date(startDate);
    toDate = new Date(endDate);
  } else if (frequency !== 'all') {
    const days = parseInt(frequency, 10); // e.g. 7, 30, 365
    fromDate = new Date();
    fromDate.setDate(now.getDate() - days);
    toDate = now;
  }

  return { fromDate, toDate };
};

// POST /api/expenses
export const createExpense = async (req, res) => {
  try {
    const { amount, type, category, reference, description, date, transaction_date } = req.body;
    
    if (!amount || !type || !category) {
      return res.json({ success: false, message: 'Missing fields' });
    }

    // Support both 'date' and 'transaction_date' field names
    const transactionDate = date || transaction_date || new Date().toISOString().split('T')[0];
    
    const [insertResult] = await db.query(
      'INSERT INTO transactions (user_id, amount, type, category, reference, description, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, amount, type, category, reference || null, description || null, transactionDate]
    );

    const [newTransaction] = await db.query(
      'SELECT * FROM transactions WHERE id = ?',
      [insertResult.insertId]
    );

    res.json({ success: true, data: newTransaction[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/expenses
// query: frequency, type, startDate, endDate, page, pageSize
export const getExpenses = async (req, res) => {
  try {
    const {
      frequency = 'all',
      type = 'all',
      startDate,
      endDate,
      page = 1,
      pageSize = 10,
    } = req.query;

    let whereClause = 'user_id = ?';
    const whereValues = [req.user.id];

    // date filter
    const { fromDate, toDate } = parseDateFilters({
      frequency,
      startDate,
      endDate,
    });

    if (fromDate && toDate) {
      whereClause += ' AND transaction_date BETWEEN ? AND ?';
      whereValues.push(fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]);
    }

    // type filter
    if (type !== 'all') {
      whereClause += ' AND type = ?';
      whereValues.push(type); // 'income' or 'expense'
    }

    const limit = Number(pageSize) || 10;
    const offset = (Number(page) - 1) * limit;

    // Get total count
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM transactions WHERE ${whereClause}`,
      whereValues
    );
    const total = countResult[0]?.total || 0;

    // Get paginated results
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE ${whereClause} ORDER BY transaction_date DESC, created_at DESC LIMIT ? OFFSET ?`,
      [...whereValues, limit, offset]
    );

    res.json({
      success: true,
      transactions: rows,
      pagination: {
        total: total,
        page: Number(page),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/expenses/:id
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = [];
    const updateValues = [];

    // Build dynamic update query
    // Support both 'date' and 'transaction_date' field names
    const dateValue = req.body.date || req.body.transaction_date;
    if (dateValue !== undefined) {
      updateFields.push('transaction_date = ?');
      updateValues.push(dateValue);
    }

    const allowedFields = ['amount', 'type', 'category', 'reference', 'description'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(req.body[field]);
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    updateValues.push(id, req.user.id);

    const [updateResult] = await db.query(
      `UPDATE transactions SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`,
      updateValues
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    const [updated] = await db.query(
      'SELECT * FROM transactions WHERE id = ?',
      [id]
    );

    res.json({ success: true, data: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/expenses/:id
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const [deleteResult] = await db.query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



