
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
// import connectDB from './config/mongodb.js'
import mysqlPool from './config/mysql.js'
import connectCloudnary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import expenseRouter from './routes/expenseRoute.js'
import budgetRouter from './routes/budgetRoute.js'
import goalsRouter from './routes/goalsRoute.js'
import addReferenceColumn from './migrations/addReferenceColumn.js'
import createBudgetsTable from './migrations/createBudgetsTable.js'
import createGoalsTable from './migrations/createGoalsTable.js'



const app = express()
const port = process.env.PORT || 4000
// connectDB()
connectCloudnary()

// Verify MySQL connection on startup and run migrations
mysqlPool.query('SELECT 1')
  .then(async () => {
    console.log('MySQL connection successful');
    // Run migrations
    try {
      await addReferenceColumn();
      await createBudgetsTable();
      await createGoalsTable();
    } catch (err) {
      console.error('Migration error:', err);
      // Don't exit, just log the error - column might already exist
    }
  })
  .catch((err) => {
    console.error('MySQL connection failed', err);
    process.exit(1);
  });

app.use(express.json())
app.use((cors()))


app.use('/api/user', userRouter)
app.use('/api/user/transactions', expenseRouter)
app.use('/api/user/budgets', budgetRouter)
app.use('/api/user/goals', goalsRouter)


app.get('/', (req,res)=> {
    res.send('API WORKING...')
})

app.listen(port, ()=> console.log("Server Running at", port))