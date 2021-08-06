/*
 *  Importing Modules
*/
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
/**
 *  Importing App Modules
 */
import api from './api/routes/api.route.js'
import page from './api/routes/page.route.js'
/**
 *  App config
 */
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

/**
 *  Middelwares
 */
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use('/api', api)
app.use('/', page)

// static folders and files
// bootstrap (css, js and jquery) middlewares
app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static('node_modules/jquery/dist'))
// mdbootstrap (css, js) middle ware
app.use('/mdb/css', express.static('node_modules/mdbootstrap/css'))
app.use('/mdb/js', express.static('node_modules/mdbootstrap/js'))

/**
 *  Connecting to database and port
 */
mongoose.connect(process.env.DATABASE_URI, {
   useFindAndModify: false,
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})
.then( () => app.listen(PORT, ()=>{
  console.log(`connected to Database and listen on port: ${PORT}`)
}))
.catch(err=> console.log(err.message))