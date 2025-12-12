import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/userController.js'
// import { addTransaction, getTransactions, deleteTransaction, updateTransaction, getTransactionAnalytics } from '../controllers/transactionController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

// User routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

// Transaction routes
// userRouter.post('/transactions', authUser, addTransaction)
// userRouter.get('/transactions', authUser, getTransactions)
// userRouter.get('/transactions/analytics', authUser, getTransactionAnalytics)
// userRouter.delete('/transactions/:id', authUser, deleteTransaction)
// userRouter.put('/transactions/:id', authUser, updateTransaction)

export default userRouter