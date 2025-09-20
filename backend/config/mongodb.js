import mongoose from "mongoose"

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connection Sucessfull"))

    await mongoose.connect(`${process.env.MONGODB_URI}/clinicconnect`)
}

export default connectDB