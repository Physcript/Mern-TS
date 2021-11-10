require('dotenv').config()

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config/config';
import routes from './routes';

// middleware
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))


// ROUTES
app.use('/api', routes.authRouter)

// database
mongoose
    .connect(`${config.MONGODB.url}`,config.MONGODB.options)
    .then(() =>{
        console.log('DATABASE CONNECTED')
    }
    )
    .catch((error) => {
        console.log(error)
    })

const PORT = config.SERVER.port

app.listen(PORT,()=> {
    console.log('Server is running on port', PORT)
})
