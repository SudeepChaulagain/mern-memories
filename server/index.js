import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.get('/', (req,res)=>{
   res.send('This is a mern memories api!')
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> app.listen(PORT, ()=> console.log(`Server is listening at port: ${PORT}`)))
        .catch((error)=> console.log(error.message))