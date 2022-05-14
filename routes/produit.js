const express = require("express"),
    { isLoggedIn } = require("../middleware/auth"),
    { createProduit, showProduit, deleteProduit , showAllProduit} = require("../middleware/produit");
router = express.Router();


router.route("/").post(createProduit);
router.route("/").get(showAllProduit);
router.route("/:id").get(showProduit).delete(isLoggedIn,deleteProduit);
module.exports = router;