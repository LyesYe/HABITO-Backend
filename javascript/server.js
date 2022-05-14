// ------------------------------------------------------------------------
// Setup
const axios = require('axios').default;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
app.use(bodyParser.json());

// Run
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ------------------------------------------------------------------------
// Terra webhook

// Get fitness data for user endpoint
app.post("/terra", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});




athlete = axios.get(`https://api.tryterra.co/v2/userInfo/fd43ee3f-106f-475c-b7d3-1037ed6cb8f3`,{
                headers : {
                    "dev-id": "npm-init-mate-1PfuWb9SNu",
                    "x-api-key": "ddcb9824de62d74d8830b65d3eb4fdeabab0d14d8515999ab712449510689c40"
                }
            });
            atheleteData = athlete.data;
            console.log(atheleteData)

