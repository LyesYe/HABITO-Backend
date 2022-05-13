const express = require("express"),
    { isLoggedIn } = require("../middleware/auth"),
    {
        showPublicSavedQuotes,
        showSpecificSavedQuotes,
        updateSavedQuotes,
        saveQuote,
        deleteSavedQuotes,
    } = require("../middleware/savedQuotes");
router = express.Router();

router.route("/").get(showPublicSavedQuotes);

router.route("/saveQuote").put(isLoggedIn, saveQuote);

router.route("/edit").put(isLoggedIn,updateSavedQuotes);
router.route("/:id").get(showSpecificSavedQuotes).all(isLoggedIn).delete(deleteSavedQuotes);



module.exports = router;
