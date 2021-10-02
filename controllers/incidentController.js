const express = require('express')

const router = express.Router()

const Client = require('../models/client')
const Incident = require('../models/incident')
const User = require('../models/user')


const authRequired = (req, res, next) => {
	if (req.session.currentUser) {
		next()
	} else {
		// if there's no user logged in
		res.send('You must be logged in to do that!')
	}
}



//make route for new incident 
router.get('/newI/client/:id', (req, res) => {
    
    res.render('newincident.ejs', {clientId: req.params.id} )
    
})



//post
router.post('/newI/client/:id', (req,res) => {
    console.log('currentUder: ', req.session.currentUser)
       const newIncident = {
           employeeData: req.session.currentUser._id, 
           incidentReport: req.body.incidentReport
       }
       console.log('req.session ',  req.session)
       console.log('newIncident ', newIncident)
        Incident.create(newIncident, (error, createdIncident) => {
            if(error) {
                console.log(error)
                res.send(error)
            
            }else {
                Client.findById(req.params.id, (error, foundClient) => {
                    if(error){
                        console.log(error)
                        res.send(error)
                    } else {
                        foundClient.review.push(createdIncident.id)
                        foundClient.save()
                        res.redirect(`/clients/${foundClient.id}`)
                    }
                    
                })
            }
        })
})










module.exports = router