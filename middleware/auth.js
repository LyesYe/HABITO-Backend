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
    isAdmin: async function (req, res, next) {
        if (!req.user.is_Admin) return res.status(403).send("user is not an Admin");
        next();
    },
};
