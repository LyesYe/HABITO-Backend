const Content = require("../models/content"),
    Quote = require ("../models/quote");
module.exports = {
    showContent: async (req, res) => {
        try {
            const Contents = await Content.find().select({quotes : 0});
            res.json(Contents);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    createContent: async (req, res) => {
        try {
            const { text, cover , category  } = req.body,
                content = await Content.create({ text, cover,category });
                
            res.json(content);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showSpecificContent: async (req, res) => {
        try {
            const id = req.params.id,
                content = await Content.findById(id).populate("quotes");
            res.json(content);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateContent: async (req, res) => {
        try {
            const id = req.params.id,
                { text, cover,category } = req.body;
            let content = await Content.findById(id);
            // if (content.user !== req.user._id)
            //     throw new Error("You aren't allowed to edit this Content.");
            content.text = text ? text : content.text;
            content.cover = cover ? cover : content.cover;
            content.category = category ? category : content.category;

            await content.save();
            res.json(content);
        } catch (e) {
            res.json({ error: e.message });
        }
    },

    deleteContent: async (req, res) => {
        try {
            const id = req.params.id;
            let content = await Content.findById(id);
            // if (content.user !== req.user._id)
            //     throw new Error("You aren't allowed to delete this Content.");
            content.remove();
            res.json(content);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    addQuote: async (req, res) => {
        const id = req.params.id,
            { quote } = req.body;
        try {
            let content = await Content.findById(id);
            // if (content.user !== req.user._id)
            //     throw new Error("You aren't allowed to add a quote to this Contet list.");
            content.quotes.push(quote);
            content.save();
            res.json(content);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAnime: async (req, res) => {
        try {
            const Contents = await Content.find({ category: "Anime" }).select({quotes : 0 });
            res.json(Contents);
        } catch (e) {
            console.log(e);
            res.json({ error: e.message });
        }
    },
    showMovies: async (req, res) => {
        try {
            const Contents = await Content.find({ category: "Movie" }).select({quotes : 0});
            res.json(Contents);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showTv: async (req, res) => {
        try {
            const Contents = await Content.find({ category: "Tv" }).select({quotes : 0});
            res.json(Contents);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};
