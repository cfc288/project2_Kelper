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


// //where does this go? In a route?
// function getReviewsWithPosts(username){
//   return User.findOne({ username: username })
//     .populate('review').exec((err, Incident) => {
//       console.log("Populated User " + Incident);
//     })
// }



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

  
  // const timestamp = new Date()
  // res.send(`${timestamp}`)
  //can i use Date.now() ?
  //look at later to implement time
  //https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript 


// set up NEW route 
//"newclient.ejs"
router.get('/new', (req, res) => {
  res.render('newclient.ejs')
})



// SHOW route
router.get('/:id', (req, res) => {
    // console.log('employeeData: ', employeeData)
    Client.findById(req.params.id).populate({path:'review', model:'Incident', 
    populate:{path:'employeeData', model:'User'}
  }).exec( 
    (error, foundClient, company, location, createdDate,lastUpdated, userTitle, review) => {

    //all the console logs to figure out how to display everything!!!!  
    console.log('foundClient.review: ', foundClient.review)
    console.log('foundClient.review[0].incidentReport: ', foundClient.review[0].incidentReport)
    


    res.render('clientpage.ejs', {
      foundClient: foundClient, 
      review: foundClient.review[0].incidentReport, 
      company: foundClient.review[0].employeeData.company,  
      location: foundClient.review[0].employeeData.location,
      userTitle: foundClient.review[0].employeeData.employeeTitle,
      createdDate: foundClient.review[0].createdAt,
      lastUpdated: foundClient.review[0].updatedAt,
      

    })

  })
})

//foundClient.review[i] 


// set up POST ROUTE "Create"
router.post('/index', (req, res) => {
	if (req.session.currentUser) {

	  console.log(req.body)
	  
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
        foundClient: foundClient,
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