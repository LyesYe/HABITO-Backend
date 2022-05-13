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
        try {
            const habi = await Habit.findById(id);
            res.json(habi);
        } catch (e) {
            res.json({ error: e.message });
        }
    }

}