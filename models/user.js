const express = require('express')
const bcrypt = require('bcrypt');

// we need our User model
const User = require('../models/user')

const router = express.Router()

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

router.post('/register', (req, res) => {
	// we need to encrypt our passwords
	// we can use the bcrypt library for this
	// we need to import the library at the top of our file
	// first we generate the salt
	const salt = bcrypt.genSaltSync(10)
	// salt is random garbage we add to our encrypted passwords
	// the number we pass to genSaltSync determines how much salt
	// we're adding, the more the more secure, but the longer it takes
	// now we're going to generate the actual hashed password
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)
	// first let's see if somebody else already has this username
	User.findOne({username: req.body.username}, (error, userExists) => {
		if (userExists) {
			res.send('That username is taken!')
		} else {
			User.create(req.body, (error, createdUser) => {
				req.session.currentUser = createdUser
				res.redirect('/index')
			})
		}
	})
})

router.get('/signin', (req, res) => {
		res.render('users/signin.ejs')
	}
)

router.post('/signin', (req, res) => {
	// we need to get the user with that username
	User.findOne({ username: req.body.username}, (error, foundUser) => {
		if (foundUser) {
			// if they do exist, we need to compare their passwords
			// we can compare passwords using bcrypt's compareSync function
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
			// compareSync returns true if they match
			// and false if they don't
			// if the passwords match, log them in
			if (validLogin) {
				req.session.currentUser = foundUser
				// we're letting the session know
				// that we have a user logged in
				res.redirect('/index')
			} else {
				// if they don't match, send a message
				res.send('Invalid username or password')
			}
			
		} else {
			// if they don't exist, we need to send a message
			res.send('Invalid username or password')
		}
	})			
			
})

// DESTROY session route
router.get('/signout', (req, res) => {
	req.session.destroy()
	// this DESTROYs the session
	res.redirect('/index')
})

module.exports = router