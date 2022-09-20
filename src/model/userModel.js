const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        enum:['Mr','Mrs','Miss']
    },
    Name: {
        type: String,
        require: true
    },
    Phone: {
        type: String,
        require: true,
        unique:true
    },
    email:{
      type: String ,
      require:true,
      unique:true 
    },
    address:{
        street: String,
        city:String,
        pincode:String
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
