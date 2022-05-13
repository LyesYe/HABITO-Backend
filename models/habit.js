const mongoose = require("mongoose"),
 
    
    habitSchema = new mongoose.Schema({
        name :{
            type : String,
            required : true
        } ,
        progress : Number,
        goal : Number,
        unit : String,
        reward : {
            type : Number,
            default : 10
        }
        ,
        penalty : {
            type : Number,
            default : 5
        },
        maxTH : Number,
        minTH : Number,

    })
    module.exports = mongoose.model("habit", habitSchema);