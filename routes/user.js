const express = require("express"),
    { isLoggedIn, isAdmin } = require("../middleware/auth"),
    { showUser, updateUser,deleteUser } = require("../middleware/user");
router = express.Router();
// /users
router.route("/:id").get(showUser).put(isLoggedIn, updateUser).delete(isLoggedIn,deleteUser);
module.exports = router;