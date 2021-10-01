const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},

    email: {
		type: String,
		required: true,
		unique: true,
	},
	company: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	employeeTitle: {
		type: String,
		required: true,
	}

})

const User = mongoose.model('User', userSchema)

module.exports = User