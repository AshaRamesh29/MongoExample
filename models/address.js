const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name:{
        type: "String",
        required : true
    }
})

const Address= mongoose.model('address',addressSchema)
module.exports = Address

