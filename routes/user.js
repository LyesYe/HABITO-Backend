const express = require("express"),
    { isLoggedIn } = require("../middleware/auth"),
    {showUser,updateUser,getUserHabits,deleteUser,createHabitForUser } = require("../middleware/user");
router = express.Router();



router.route("/UserHabits").get(getUserHabits);
router.route("/createHabitForUser").put(createHabitForUser);
router.route("/:id").get(showUser).put(isLoggedIn, updateUser).delete(isLoggedIn,deleteUser);

module.exports = router;


