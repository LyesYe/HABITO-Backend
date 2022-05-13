const Saved = require("../models/savedQuotes"),
    Quote = require ("../models/quote"),
    User = require("../models/user");

module.exports = {
    showPublicSavedQuotes : async (req, res) => {
        try {
            const saved = await Saved.find({ public: true }).populate("quotes").populate("user","username");
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showSpecificSavedQuotes : async (req, res) => {
        try {
            const id = req.params.id,
                saved = await Saved.findById(id);
                if(saved.public==false)
                {
                    throw Error("this list is private");
                }
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateSavedQuotes :  async (req, res) => {
        try {
            
               let {  public } = req.body;
            let saved = await Saved.findById(req.user.savedQuotes);
            
            
            if(public || public ===false)saved.public = public;


            await saved.save();
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteSavedQuotes : async (req, res) => {
        try {
            const id = req.params.id;
            let saved = await Saved.findById(id);
            if (saved.user._id.toString() !== req.user._id.toString())
            {
                throw new Error("You aren't allowed to delete this list.");
            }
            await saved.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    saveQuote : async (req, res) => {
            const { id } = req.body;
        try {
           
            let saved =  await Saved.findById(req.user.savedQuotes);
            await saved.quotes.push(id);
            await saved.save();
            await req.user.save();
            res.json({"message":"saved"});
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}   