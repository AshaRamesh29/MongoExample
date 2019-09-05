const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true, 
        trim : true
    },
    email:{
        type : String,
        required: true,
        trim :true, 
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is not valid..please provide valid email')
            }
        }
    },
    password : {
        type : String,
        required: true,
        trim :true,
        minlength :6
    },
    address:{
        type : mongoose.SchemaTypes.ObjectId,
        ref: "address"
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;
