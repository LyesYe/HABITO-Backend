const Quote = require("../models/quote"),
     Content = require("../models/content");

module.exports = {
    createQuote : async (req, res) => {
        let { text,author,show,cover,category } = req.body;
        try {
            const quote = await Quote.create({ text,author,show  });
            let content = await Content.findOne({text : new RegExp(show,"i")});
            if(content == null)
            {
                text = show;
                content = await Content.create({text,cover,category});
            }
            content.quotes.push(quote);
            content.save();
            res.status(201).json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showQuote : async (req, res) => {
        const id = req.params.id;
        try {
            const quote = await Quote.findById(id).select({_id : 0});
            res.json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAllQuote: async (req, res) => {
        try {
            const quotes = await Quote.find().select({_id : 0});
            res.json(quotes);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    editQuote : async (req, res) => {
        const { text,author,show } = req.body,
            id = req.params.id;
        try {
            const quote = await Quote.findById(id);
            quote.text = text ? text : quote.text;
            quote.author = author ? author : quote.author;
            quote.show = show ? show : quote.show;
            await quote.save();
            res.status(201).send(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteQuote : async (req, res) => {
        try {
            const id = req.params.id,
                quote = await Quote.findById(id);
            await quote.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}