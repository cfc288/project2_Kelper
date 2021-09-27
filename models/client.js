const mongoose = require('mongoose')
const { Schema , model } = mongoose


const clientSchema = new Schema({
  clientName: {type: String, required: true},
  review: {type: String, required: true},
//{
//     incidentReport: {type: String, required: true},
//     reportingCompany: {type: String, required: true},
//     reportingEmployeeTitle:{type: String, required: true} }

  

})

// "model()" will initialized the collection
const Client = model('client', clientSchema)
//            collection name
module.exports = Client