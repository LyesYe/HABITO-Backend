const axios = require('axios')
const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    user = require("./models/user"),
    userRouter = require("./routes/user"),
    userAuth = require("./routes/auth"),
    



   
    port=3000;

    app.use(express.json());
    
    app.use("/users", userRouter);
    app.use("/", userAuth);
    
    mongoose.set("debug", true); // in devolpment process
    mongoose
    .connect(
        "mongodb+srv://sami:Nwxp0HRkegkzO2uw@hack-it.yeaqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        dbName: "quotesAPI",
    })
    .then((con) => {
        console.log("Database is connected");
        app.listen(port, () => {
            console.log(`Server started on ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
    



