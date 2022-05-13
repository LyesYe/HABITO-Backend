const express = require("express"),


{ createHabit,getHabit,showAllHabits,deleteHabit ,updateHabit } = require("../middleware/notif");
router = express.Router();



router.route("/showAll").get(showAllHabits);
router.route("/").post(createHabit);
router.route("/:id").post(getHabit).delete(deleteHabit).put(updateHabit);


router = express.Router();

