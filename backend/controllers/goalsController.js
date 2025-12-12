import db from '../config/mysql.js';

// GET /api/user/goals
export const getGoals = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ success: true, goals: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/user/goals
export const createGoal = async (req, res) => {
  try {
    const { title, description, target_amount, target_date } = req.body;

    if (!title || target_amount === undefined || target_amount === null) {
      return res
        .status(400)
        .json({ success: false, message: 'Title and target amount are required' });
    }

    const numericTarget = Number(target_amount);
    if (Number.isNaN(numericTarget) || numericTarget < 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Target amount must be a non-negative number' });
    }

    const [insertResult] = await db.query(
      'INSERT INTO goals (user_id, title, description, target_amount, target_date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, title.trim(), description || null, numericTarget, target_date || null]
    );

    const [newGoal] = await db.query('SELECT * FROM goals WHERE id = ?', [insertResult.insertId]);
    res.json({ success: true, goal: newGoal[0], message: 'Goal created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/user/goals/:id
export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, target_amount, saved_amount, target_date, status } = req.body;

    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title.trim());
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (target_amount !== undefined) {
      const numericTarget = Number(target_amount);
      if (Number.isNaN(numericTarget) || numericTarget < 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Target amount must be non-negative' });
      }
      updates.push('target_amount = ?');
      values.push(numericTarget);
    }
    if (saved_amount !== undefined) {
      const numericSaved = Number(saved_amount);
      if (Number.isNaN(numericSaved) || numericSaved < 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Saved amount must be non-negative' });
      }
      updates.push('saved_amount = ?');
      values.push(numericSaved);
    }
    if (target_date !== undefined) {
      updates.push('target_date = ?');
      values.push(target_date || null);
    }
    if (status !== undefined) {
      const normalizedStatus = status === 'completed' ? 'completed' : 'active';
      updates.push('status = ?');
      values.push(normalizedStatus);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }

    values.push(id, req.user.id);

    const [result] = await db.query(
      `UPDATE goals SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    const [updated] = await db.query('SELECT * FROM goals WHERE id = ?', [id]);
    res.json({ success: true, goal: updated[0], message: 'Goal updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/user/goals/:id
export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM goals WHERE id = ? AND user_id = ?', [
      id,
      req.user.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Goal not found' });
    }

    res.json({ success: true, message: 'Goal removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



