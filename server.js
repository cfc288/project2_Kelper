//modules that you are importing/require
const express = require('express')
const app = express()
const methodOverride = require('method-override')

require('dotenv').config();
// let's move our PORT to .env too
const PORT = process.env.PORT

//for cookies 
//install npm i express-sessions
const session = require('express-session')
require('dotenv').config() 

//calling the database to the server
const Client = require("./models/client")

// to set up database
const mongoose = require('mongoose')


//basiccrud is the name of the database we will use/create
//if it exists it will link to it, if it doesnt it will create it
const mongoURI = process.env.MONGODB_URI

//to connect to DB
const db = mongoose.connection
//to use method override
app.use(methodOverride('_method'))

mongoose.connect(mongoURI, {
    //useFindAndModify: false,  // has been depricated
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, () => { 
    //console.log('database with mongoose connected')
})


db.on('error', (err) => {console.log('Error: ', err) })
db.on('connected', () => {console.log('mongo (and db) connected') })
db.on('disconnected', () => {console.log('mongo (and db) disconnected') })

// MIDDLEWARES
// this will parse the data and create the "req.body object"
app.use(express.urlencoded({ extended: true }))

// method override
// This will allow us to make DELETE and PUT requests
app.use(methodOverride('_method'))

//adds css files
app.use(express.static('public'))

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here\'s SESSION_SECRET')
console.log(SESSION_SECRET)

// session with our secret
app.use(
    session({
      secret: SESSION_SECRET,
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    }))
  

app.get('/check-session-property', (req, res) => {
    if (req.session.someProperty) {
      res.send(req.session.someProperty)
    } else {
      res.send("We haven't set anything yet!")
    }
  })
  
  app.get('/set-session-property/:value', (req, res) => {
    req.session.someProperty = req.params.value
    res.redirect('/index')
  })
  
  
  app.get('/destroy-session', (req, res) => {
    req.session.destroy()
    res.redirect('/index')
  })


//home route
app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.get('/about', (req, res) => {
  res.render('about.ejs')
})

// CONTROLLERS

// import your controllers
// const userController = require('./controllers/exampleController')
// use them with app.use
// app.use('/example', exampleController)



const clientController = require('./controllers/clientController')
app.use('/clients', clientController)

const userController = require('./controllers/userController')
app.use('/users', userController)



app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})