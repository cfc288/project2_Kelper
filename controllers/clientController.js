const express = require('express')

const router = express.Router()

const Client = require('../models/client')

const authRequired = (req, res, next) => {
	if (req.session.currentUser) {
		next()
	} else {
		// if there's no user logged in
		res.send('You must be logged in to do that!')
	}
}

//index route
// set up index list all of the clients
router.get('/index', (req, res) => {

  Client.find({}, (err, allClients) => {
    console.log(allClients)
    res.render('index.ejs', {
      clients: allClients
    })
  })

})



// set up NEW route 
//"new.ejs"
router.get('/new', (req, res) => {
  res.render('newclient.ejs')
})



// set up show route -- GET /fruits/:id -- info about JUST ONE fruit
router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (error, foundClient) => {
    console.log(foundClient)
    res.render('clientpage.ejs', { client: foundClient })
  })
})


// set up POST ROUTE "Create"
router.post('/index', (req, res) => {
	// users can only add fruit if they're signed in
	if (req.session.currentUser) {
	//   if (req.body.readyToEat === "on") {
	//     req.body.readyToEat = true
	//   } else {
	//     req.body.readyToEat = false
	//   }
	//   console.log(req.body)
	  
	  Client.create(req.body, (error, createdClient) => {
	    if (error){
	      console.log(error)
	      res.send(error)
	    } else {
	      console.log(createdClient)
	      res.redirect('/clients/index')
	    }
	  })
	} else {
		res.send("You must be logged in to do that!")
	}
})


// setting up our DELETE route
router.delete('/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id, (error, deletedClient) => {
    // findByIdAndDelete will delete a document with a given id
    if (error) {
      console.log(error)
      res.send(error)
    } else {
     // redirect to the index page if the delete successful
     res.redirect('/clients/index')
    }
  })
})



// make an edit page and a route to it
router.get('/:id/edit', authRequired, (req, res) => {
  Client.findById(req.params.id, (error, foundClient) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      res.render('edit.ejs', {
        client: foundClient,
      })
    }
  })
})


//"update" route
router.put('/:id', (req, res) => {

  // makes route update the model
  Client.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {
      new: true,
    },
    (error, updatedClient) => {

    let clientId = req.params.id
      if (error) {
        console.log(error)
        res.send(error)
      } else {
        res.redirect(`/clients/${clientId}`)
      }
    })
})

module.exports = router