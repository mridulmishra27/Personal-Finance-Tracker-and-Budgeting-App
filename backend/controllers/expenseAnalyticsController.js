import db from '../config/mysql.js';
import { parseDateFilters } from '../utils/dateFilters.js';

// GET /api/expenses/analytics
export const getExpenseAnalytics = async (req, res) => {
  try {
    const { frequency = '365', type = 'all', startDate, endDate } = req.query;

    let whereClause = 'user_id = ?';
    const whereValues = [req.user.id];

    const { fromDate, toDate } = parseDateFilters({
      frequency,
      startDate,
      endDate,
    });

    if (fromDate && toDate) {
      whereClause += ' AND transaction_date BETWEEN ? AND ?';
      whereValues.push(fromDate.toISOString().split('T')[0], toDate.toISOString().split('T')[0]);
    }

    if (type !== 'all') {
      whereClause += ' AND type = ?';
      whereValues.push(type);
    }

    // total income & expense
    const [incomeRows] = await db.query(
      `SELECT COALESCE(SUM(amount), 0) as totalIncome FROM transactions WHERE ${whereClause} AND type = 'income'`,
      whereValues
    );
    const totalIncome = Number(incomeRows[0]?.totalIncome || 0);

    const [expenseRows] = await db.query(
      `SELECT COALESCE(SUM(amount), 0) as totalExpense FROM transactions WHERE ${whereClause} AND type = 'expense'`,
      whereValues
    );
    const totalExpense = Number(expenseRows[0]?.totalExpense || 0);

    // total count
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM transactions WHERE ${whereClause}`,
      whereValues
    );
    const totalCount = countResult[0]?.total || 0;

    // category-wise stats
    const [categoryStats] = await db.query(
      `SELECT category, type, SUM(amount) as totalAmount, COUNT(id) as count 
       FROM transactions 
       WHERE ${whereClause} 
       GROUP BY category, type 
       ORDER BY totalAmount DESC`,
      whereValues
    );

    res.json({
      success: true,
      data: {
        totals: {
          totalTransactions: totalCount,
          totalIncome,
          totalExpense,
        },
        categories: categoryStats.map(row => ({
          category: row.category,
          type: row.type,
          totalAmount: Number(row.totalAmount || 0),
          count: Number(row.count || 0),
        })),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

