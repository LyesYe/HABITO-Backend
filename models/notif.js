const mongoose = require("mongoose"),
 
    
    notifSchema = new mongoose.Schema({
        title :{
            type : String,
            required : true
        } ,
        description :{
            type : String,

        },
        
    });
    module.exports = mongoose.model("notif", notifSchema);