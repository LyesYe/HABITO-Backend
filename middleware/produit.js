const Produit = require("../models/produit");
     

module.exports = {
    createProduit : async (req, res) => {
        let { name,description,img,price,code ,storeLink } = req.body;
        try {
            const prod = await Produit.create({ name,description,img,price,code ,storeLink });
            
            
            prod.save();
            res.status(201).json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showProduit : async (req, res) => {
        const id = req.params.id;
        try {
            const prod = await Produit.findById(id).select({_id : 0});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAllProduit: async (req, res) => {
        try {
            const prod = await Produit.find().select({_id : 0});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteProduit : async (req, res) => {
        try {
            const id = req.params.id,
                prod = await Produit.findById(id);
            await prod.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}