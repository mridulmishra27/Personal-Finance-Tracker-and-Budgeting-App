// import aiRouter from './routes/aiRoute.js'
// import doctorRouter from './routes/doctorRoute.js'
// import adminRouter from './routes/adminRoute.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudnary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'



const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudnary()

app.use(express.json())
app.use((cors()))

// app.use('/api/admin', adminRouter)
// app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
// app.use('/api/ai', aiRouter); // Add this line


app.get('/', (req,res)=> {
    res.send('API WORKING...')
})

app.listen(port, ()=> console.log("Server Running at", port))