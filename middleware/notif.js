const Notif = require("../models/notif");
const User = require("../models/user");
     

module.exports = {
    createNotif : async (req, res) => {
        let { title,description } = req.body;
        try {
            const prod = await Produit.create({ title,description });
            
            
            prod.save();
            res.status(201).json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showNotif : async (req, res) => {
        const id = req.params.id;
        try {
            const prod = await Produit.findById(id).select({_id : 0});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAllNotif: async (req, res) => {
        try {
            const prod = await Notif.find().select({_id : 0});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAllUserNotif: async (req, res) => {
        const id = req.params.id;
        try {
            const prod = await User.findById(id).select({notifs : 1});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteNotif : async (req, res) => {
        try {
            const id = req.params.id,
                prod = await Notif.findById(id);
            await prod.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}