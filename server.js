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
const Fruit = require("./models/index")

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



//now we can access our environment variables with process.env

// Sessions
// HTTP is a stateless protocol
// This means that the protocol itself doesn't track
// Who's making a request, or what requests they've already made
// We need a way to give it stateful behavior
// We need it to track what the user has already done
// We're going to do this using cookies and sessions
// A cookie is basically just a string that the server
// sends to the browser, and then the browser sends back
// we're going to use cookies, to identify particular users
// in what we call "sessions"

// Environment Variables
// Enivornment variables are variables that might change
// based on the given environment
// development vs production, your computer vs my computer
// we can store them and access them in .env file
// this is also a good place to put any information we don't want public
// API keys, session secrets
// ALWAYS .gitignore your .env file
// NOTE: .env is NOT a JavaScript File

// we need to set up access to our .env file


// now we can access our environment variables
// with process.env

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here\'s SESSION_SECRET')
console.log(SESSION_SECRET)

// now we can set up our session with our secret
app.use(
    session({
      secret: SESSION_SECRET,
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
    }))
  
// this middleware attaches a cookie to our responses
// which will then get saved by the user's browser
// the browser will then send it back in its requests
// the server will then be able to identify the user
// using cookies
// think of the cookies like a key or maybe an ID card

// when the server gets a request, it checks for cookies
// and if it finds one attaches a session object
// to the request object
// we can use the session object to track information
// about the user

// routes to demonstrate sessions and cookies

// all the information is being tracked on the back end
// if we restart our server, all sessions will end
app.get('/check-session-property', (req, res) => {
    if (req.session.someProperty) {
      res.send(req.session.someProperty)
    } else {
      res.send("We haven't set anything yet!")
    }
  })
  
  app.get('/set-session-property/:value', (req, res) => {
    // we can set session properties directly
    // on the session object
    req.session.someProperty = req.params.value
    res.redirect('/index')
  })
  
  // we can also purposely destroy our session
  // by calling .destroy() on it
  // think about logging out from app
  app.get('/destroy-session', (req, res) => {
    req.session.destroy()
    res.redirect('/index')
  })





// CONTROLLERS

// import your controllers
const exampleController = require('./controllers/exampleController')


// use them with app.use
app.use('/example', exampleController)


// here we're telling our app
// "When you see a URL that starts with /example,
// use this router"

const clientController = require('./controllers/clientController')
app.use('/index', clientController)

const userController = require('./controllers/userController')
app.use('/users', userController)

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})