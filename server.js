import express from 'express'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import 'express-async-errors'
import morgan from 'morgan'
const app = express()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
import authenticateUser from './middleware/auth.js'


import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobRoutes.js'
import connectDB from './db/connect.js'
dotenv.config()

const port = process.env.PORT || 5000

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start =async ()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log('hello')
            console.log(`server is listening on port ${port}...`)
        })
    } catch(error){
        console.log(error);
    }
}

start()
