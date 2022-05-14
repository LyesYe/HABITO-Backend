const axios = require('axios')

const User = require("../models/user"),
    jwt = require("jsonwebtoken");
    module.exports = {
    isLoggedIn: async (req, res, next) => {
        if (!req.headers.authorization)
            return res.status(400).send("You don't have the authorization");
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            let payload = jwt.verify(token, "gqekjgbqejkhbgkjhbgtjkb<jgbjuos<hjkg<sg<sg24sg54s54g");
            req.user = await User.findById(payload.id).select({ password: 0 });
            if(!req.user) throw Error("no user");
            next();
        } catch (e) {
            switch (e.constructor) {
                case jwt.TokenExpiredError:
                    return res.status(401).send("Your token has been expired");
                case jwt.JsonWebTokenError:
                    return res.status(401).send("Your token is unvalid");
                default : return res.status(500).send(e.message);
            }
        }
    },
    generateWidget : async(req,res) => {
        try{

            const link = await axios.post("https://api.tryterra.co/v2/auth/generateWidgetSession",
            {
                "language": "EN",
                "auth_success_redirect_url": "localhost:3000/signup"
            },
            {headers : {
                "dev-id": "npm-init-mate-1PfuWb9SNu", 
                "X-API-Key": "ddcb9824de62d74d8830b65d3eb4fdeabab0d14d8515999ab712449510689c40",
                "Content-Type": "application/json",
            }}
            )
            console.log(link)

        }catch(e){
            res.status(401).json({e})
        }
    }
}
