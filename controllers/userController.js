const express = require('express')
const bcrypt = require('bcrypt');

// we need our User model
const User = require('../models/user')

const router = express.Router()

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})


router.post('/register', (req, res) => {
	
	const salt = bcrypt.genSaltSync(10)
	req.body.password = bcrypt.hashSync(req.body.password, salt)
	console.log(req.body)
	
	User.findOne({username: req.body.username}, (error, userExists) => {
		if (userExists) {
			res.send('That username is taken!')
		} else {
			User.create(req.body, (error, createdUser) => {
				req.session.currentUser = createdUser
				res.redirect('/clients/index')
			})
		}
	})
})



router.get('/signin', (req, res) => {
		res.render('users/signin.ejs')
	}
)

router.post('/signin', (req, res) => {
	
	User.findOne({ username: req.body.username}, (error, foundUser) => {
		if (foundUser) {
			
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
		
			if (validLogin) {
				req.session.currentUser = foundUser
		
				res.redirect('/clients/index')
			} else {
				res.send('Invalid username or password')
			}
			
		} else {
			res.send('Invalid username or password')
		}
	})			
			
})



// DESTROY session route (log out)
router.get('/signout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})


module.exports = router