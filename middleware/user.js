const User = require("../models/user");
const Habit = require("../models/habit");
const axios = require('axios')
module.exports = {
    createUser: async (req, res) => {
        const { user_id } = req.query;
        try {
          athlete = await axios.get(`https://api.tryterra.co/v2/userInfo/${user_id}`,{
              headers : {
               "dev-id" : "npm-init-mate-1PfuWb9SNu",
               "x-api-key" : "ddcb9824de62d74d8830b65d3eb4fdeabab0d14d8515999ab712449510689c40"
              }
          });
          atheleteData = athlete.data;

            let user = await User.create({username, terra_id : user_id,
                "first_name":atheleteData.first_name,
                "last_name": atheleteData.last_name,
                "gender": atheleteData.gender,
                "sex": atheleteData.sex,
                "date_of_birth": atheleteData.date_of_birth,
                "bio": atheleteData.bio,
                "email": atheleteData.email,
                "city": atheleteData.city,
                "state": atheleteData.state,
                "country": atheleteData.country
            });
            user.save();
        

            res.status(201).json(user.insertToken());
        } catch (e) {
            console.log(e)
            res.json({ error: e.message });
        }
    },

    logUser: async (req, res) => {
        try {
            const user = await User.findOne({ username });
            if (!user) throw new Error("We didn't find any user with this username : " + username);
            res.status(201).json(user.insertToken());
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showUser: async (req, res) => {
         
        try {
            const user = await User.findById(id).select({ passwords: 0 }).populate("savedQuotes").select({"password" : 0,"_id": 0}); //.select( "-passwords" );
            res.json(user);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateUser: async (req, res) => {
        const { first_Name, last_Name, password } = req.body,
            id = req.params.id;
        try {
            if (id.toString() !== req.user._id.toString())
                throw new Error("You aren't allowed to edit other users profiles.");
            const u = await User.findById(id);
            u.first_Name = first_Name ? first_Name : u.first_Name;
            u.last_Name = last_Name ? last_Name : u.last_Name;
            u.password = password ? password : u.password;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    getUserHabits :  async (req, res) => {
        const id = req.params.id;
        try {
            const u = await User.findById(id);
            res.status(200).json(u.habits)
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    userToAdmin: async (req, res) => {
        const id = req.params.id;
        try {
            const u = await User.findById(id);
            u.is_Admin = true;
            await u.save();
            // add published games
            res.status(201).send(u);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    createHabitForUser : async (req, res) => {
        let {username , name } = req.body;
        try {
            const u = await User.findOne({ username });
            const uData = u.getUserData();
            console.log(uData)
             
            const habi = await Habit.create({ name  });
            
            habi.save();
            u.push(habi);
            u.save();
            res.status(201).json(habi);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id,
                u = await User.findById(id);
                console.log(u);
            if (u._id.toString() !== req.user._id.toString()){
                
                throw Error("You aren't allowed to delete other people .");
            }
            await u.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};
