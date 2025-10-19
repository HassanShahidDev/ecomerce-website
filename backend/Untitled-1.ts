import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
        
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-comerce`)     
}

export default connectDB





import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDB from './config/mongodb.js'

// APP CONFIG
const app = express()
const port = process.env.PORT || 4000

connectDB()

// middlewear
app.use(express.json())
app.use(cors())

// api endpoints

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port, ()=> console.log('Server is started on port : '+port))