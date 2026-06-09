const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// TEMPORARY NEWS API
app.get("/api/news", (req, res) => {

    res.json([
        {
            id: 1,
            title: "Enrollment 2026",
            content: "Enrollment is now open."
        },
        {
            id: 2,
            title: "Recognition Day",
            content: "Recognition Day will be held on June 30."
        }
    ]);

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});