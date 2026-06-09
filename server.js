const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zoren1234",
    database: "school_db"
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("MySQL Connected!");
});

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// STUDENTS API
app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM students",
        (err, result) => {

            if (err) {
                console.log(err);
                return;
            }

            res.json(result);

        }
    );

});

// NEWS API
app.get("/api/news", (req, res) => {

    db.query(
        "SELECT * FROM news ORDER BY id DESC",
        (err, result) => {

            if (err) {
                console.log(err);
                return;
            }

            res.json(result);

        }
    );

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});