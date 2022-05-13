const mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    
    produitSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true,
        },
        description : {type: String,},
        img : {type: String,},
        price : {type: String,},
        code : {type: String,},
 

});
    
    
    module.exports = mongoose.model("produit", produitSchema);