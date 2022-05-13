const express = require("express"),

{ getuUserHabits , getHabit}  = require("../middleware/user");

router.get( "/user/:id",getUserHabit);
router.get( "/:id",getHabit);

router = express.Router();