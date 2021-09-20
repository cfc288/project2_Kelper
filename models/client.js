const mongoose = require('mongoose')
const { Schema , model } = mongoose


const clientSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  readyToEat: {type: Boolean, default: false}
})

// "model()" will initialized the collection
const Client = model('Client', clientSchema)
//            collection name
module.exports = Client