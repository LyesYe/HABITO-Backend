const axios = require('axios')
const express = require("express"),
    { createUser, logUser } = require("../middleware/user"),
    { generateWidget} = require("../middleware/auth");
router = express.Router();
router.route("/widget").post(generateWidget);
router.route("/signup").post(createUser);
router.route("/login").post(logUser);
module.exports = router;