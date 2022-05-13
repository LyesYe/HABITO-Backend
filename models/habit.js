const mongoose = require("mongoose"),
 
    
    habitSchema = new mongoose.Schema({
        name :{
            type : String,
            required : true
        } ,
        progress : Number,
        goal : Number,
        unit : String,
        reward : Number,
        penalty : Number,
        maxTH : Number,
        minTH : Number,

    })
    module.exports = mongoose.model("habit", habitSchema);