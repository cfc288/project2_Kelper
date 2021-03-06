const mongoose = require('mongoose')
const { Schema , model } = mongoose


const incidentSchema = new Schema({
    

    employeeData: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    // company: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
    // },

    // employeeTitle: { 
    // type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // },

    // location: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User'
    // },

    incidentReport: {type: String, default: 'none'},

}, 

{timestamps: true}

)

// "model()" will initialized the collection
const Incident = model('Incident', incidentSchema)
//            collection name
module.exports = Incident