const express = require("express"),
    { isLoggedIn,isAdmin } = require("../middleware/auth"),
    {
        showContent,
        createContent,
        showSpecificContent,
        updateContent,
        deleteContent,
        addQuote,
        showAnime,
        showMovies,
        showTv,
    } = require("../middleware/content");
router = express.Router();

router.route("/").get(showContent).post(isLoggedIn, createContent);

router.route("/Anime").get(showAnime);
router.route("/Movies").get(showMovies);
router.route("/Tv").get(showTv);

router.route("/:id").get(showSpecificContent).all(isLoggedIn).put(updateContent).delete(deleteContent);

router.route("/:id/addQuote").put(isLoggedIn,isAdmin, addQuote);

module.exports = router;



