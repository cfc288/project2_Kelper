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


// set up index list all of the clients
router.get('/index', (req, res) => {

  Client.find({}, (err, allClients) => {
    console.log(allClients)
    res.render('index.ejs', {
      clients: allClients
    })
  })

})

// set up New ROUTE "new.ejs"
router.get('/new', (req, res) => {
  res.render('newclient.ejs')
})


router.get('/seed', (req, res) => {
  // seed our database -- adding data for testing

  // think about what we want in our database to start
  // in case lets just add 3 fruits to start

  Client.create([
    {
        clientName: 'Karen',
        review: 'review here',
      
    },

  ], 
  (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/clients/index')
  })
})


// set up show route -- GET /fruits/:id -- info about JUST ONE fruit
router.get('/:id', (req, res) => {
  Client.findById(req.params.id, (error, foundClient) => {
    console.log(foundClient)
    res.render('show.ejs', { client: foundClient })
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
     res.redirect('/index')
    }
  })
})



// make an edit page and a route to it
// create an edit.ejs view
// link to the edit page from each of the fruits
router.get('/:id/edit', authRequired, (req, res) => {
  Client.findById(req.params.id, (error, foundClient) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      // make the edit form show the existing data
      res.render('edit.ejs', {
        client: foundClient,
      })
    }
  })
})

//update route
router.put('/:id', (req, res) => {
//   req.body.readyToEat = (req.body.readyToEat === 'on')
  // makes route update the model
  Client.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {
      new: true,
    },
    (error, updatedClient) => {
      // findByIdAndUpdate updates a fruit with a given id
      // the new option means we want the update fruit
      // without this flag, we'll get the fruit as it was
      // before the update

      if (error) {
        console.log(error)
        res.send(error)
      } else {
        // redirect to the index route
        res.redirect('/index')
      }
    } )
})

module.exports = router