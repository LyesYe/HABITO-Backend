const Habit = require("../models/habit");

module.exports = {
    createHabit : async (req, res) => {
        let {name, } = req.body;
        try {
            const habi = await Habit.create({ name,progress,goal,unit,reward,penalty,maxTH,minTH  });
            
            
            habi.save();
            res.status(201).json(habi);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    getHabit : async(req,res) => {
        const id = req.params.id;
        try {s
            const habi = await Habit.findById(id);
            res.json(habi);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showAllHabits: async (req, res) => {
        try {
            const hab = await Habit.find().select({_id : 0});
            res.json(prod);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateHabit: async (req, res) => {
        const { name,progress,goal,unit,reward,penalty,maxTH,minTH } = req.body,
            id = req.params.id;
        try {
            if (id.toString() !== req.user._id.toString())
                throw new Error("You aren't allowed to edit other users profiles.");
            const u = await User.findById(id);
            u.name = name ? name : u.name;
            u.progress = progress ? progress : u.progress;
            u.goal = goal ? goal : u.goal;
            u.unit = unit ? unit : u.unit;
            u.reward = reward ? reward : u.reward;
            u.penalty = penalty ? penalty : u.penalty;
            u.maxTH = maxTH ? maxTH : u.maxTH;
            u.minTH = minTH ? minTH : u.minTH;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteHabit : async (req, res) => {
        try {
            const id = req.params.id,
                prod = await Habit.findById(id);
            await prod.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },

}