const mongoose = require("mongoose"),
    jwt = require("jsonwebtoken"),
    bcrypt = require("bcrypt"),
    
    userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
        },
        terra_id : {type: String,},
        disease : [{ 
            type: String,
           
        }],
        habits : [{ 
            type: mongoose.Types.ObjectId,
            ref:"habit",
           
        }],
        notifs : [{ 
            type: mongoose.Types.ObjectId,
            ref:"notif",
           
        }],
        "balance" : Number,
        "heart_attack" : Boolean,
        "first_name": String,
        "last_name": String,
        "gender": String,
        "sex": String,
        "date_of_birth": String,
        "bio": String,
        "email": String,
        "city": String,
        "state": String,
        "country": String,

});
    
    userSchema.pre("save", async function (next) {
        try {
            if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 13);
            next();
        } catch (e) {
            next(e);
        }
    });

    // userSchema.methods.getUserData= async (req, res) => {
    //     const { user_id } = this.terra_id;
    //     try {
    //         athlete = await axios.get(`https://api.tryterra.co/v2/userInfo/${user_id}``,{
    //             headers : {
    //                 "dev-id": "npm-init-mate-1PfuWb9SNu",
    //                 "x-api-key": "ddcb9824de62d74d8830b65d3eb4fdeabab0d14d8515999ab712449510689c40"
    //             }
    //         });
    //         atheleteData = athlete.data;
    //         console.log(atheleteData)

            
    //     } catch (e) {
    //         res.json({ error: e.message });
    //     }
    // },
    userSchema.methods.comparePasswords = async function (passwordSent, next) {
        try {
            return await bcrypt.compare(passwordSent, this.password);
        } catch (e) {
            next(e);
        }
    };


    userSchema.methods.getUserData = function () {
        let user = this.toObject();
        athlete =  axios.get(`https://api.tryterra.co/v2/userInfo/${user.terra_id}`,{
                        headers : {
                            "dev-id": "npm-init-mate-1PfuWb9SNu",
                            "x-api-key": "ddcb9824de62d74d8830b65d3eb4fdeabab0d14d8515999ab712449510689c40"
                        }
                    });
        atheleteData = athlete.data;
        console.log(atheleteData)
        
        return atheleteData;
    };



    userSchema.methods.insertToken = function () {
        let user = this.toObject();
        user.token = jwt.sign(
            {
                id: user._id,
                first_Name: user.first_Name,
            },
            "gqekjgbqejkhbgkjhbgtjkb<jgbjuos<hjkg<sg<sg24sg54s54g",
            {
                expiresIn: "100h",
            }
        );
        return user;
    };
    module.exports = mongoose.model("user", userSchema);