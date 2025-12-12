import db from '../config/mysql.js';

// GET /api/user/budgets
export const getBudgets = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM budgets WHERE user_id = ? ORDER BY category ASC',
      [req.user.id]
    );
    res.json({ success: true, budgets: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/user/budgets
export const createOrUpdateBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    if (!category || amount === undefined || amount === null) {
      return res
        .status(400)
        .json({ success: false, message: 'Category and amount are required' });
    }

    const normalizedCategory = category.trim();
    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Amount must be a non-negative number' });
    }

    // Upsert by user/category
    const [existing] = await db.query(
      'SELECT id FROM budgets WHERE user_id = ? AND category = ?',
      [req.user.id, normalizedCategory]
    );

    if (existing.length > 0) {
      const budgetId = existing[0].id;
      await db.query(
        'UPDATE budgets SET amount = ? WHERE id = ? AND user_id = ?',
        [numericAmount, budgetId, req.user.id]
      );
      const [updated] = await db.query('SELECT * FROM budgets WHERE id = ?', [budgetId]);
      return res.json({ success: true, budget: updated[0], message: 'Budget updated' });
    }

    const [insertResult] = await db.query(
      'INSERT INTO budgets (user_id, category, amount) VALUES (?, ?, ?)',
      [req.user.id, normalizedCategory, numericAmount]
    );
    const [newBudget] = await db.query('SELECT * FROM budgets WHERE id = ?', [
      insertResult.insertId,
    ]);
    return res.json({ success: true, budget: newBudget[0], message: 'Budget added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/user/budgets/:id
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category } = req.body;

    if (amount === undefined && category === undefined) {
      return res
        .status(400)
        .json({ success: false, message: 'Nothing to update' });
    }

    const updates = [];
    const values = [];

    if (category !== undefined) {
      updates.push('category = ?');
      values.push(category.trim());
    }

    if (amount !== undefined) {
      const numericAmount = Number(amount);
      if (Number.isNaN(numericAmount) || numericAmount < 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Amount must be non-negative number' });
      }
      updates.push('amount = ?');
      values.push(numericAmount);
    }

    values.push(id, req.user.id);

    const [result] = await db.query(
      `UPDATE budgets SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    const [updated] = await db.query('SELECT * FROM budgets WHERE id = ?', [id]);
    res.json({ success: true, budget: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/user/budgets/:id
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM budgets WHERE id = ? AND user_id = ?', [
      id,
      req.user.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    res.json({ success: true, message: 'Budget removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


