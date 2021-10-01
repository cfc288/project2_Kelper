const mongoose = require('mongoose')
const { Schema , model } = mongoose


const clientSchema = new Schema({
  clientName: {type: String, required: true},
  //maybe eventually turn review into an array?
  // review: {
  //   type: String,
  //   required: true
  // }
  
  review: [{type: Schema.Types.ObjectId, ref:'Incident' }],
 
})

// "model()" will initialized the collection
const Client = model('Clients', clientSchema)
//            collection name
module.exports = Client

