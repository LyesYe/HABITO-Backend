const { isAdmin, isLoggedIn } = require("../middleware/auth");

 const express = require("express"), 
 router = express.Router(),
 { createQuote,showQuote,editQuote,deleteQuote,showAllQuote } = require("../middleware/quote");
 router.route("/").get(showAllQuote).post(isLoggedIn,isAdmin,createQuote);
 router.route("/:id").get(showQuote).put(isLoggedIn,isAdmin, editQuote).delete(isLoggedIn,isAdmin, deleteQuote);

 module.exports = router;
