require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect()
    .then(() => console.log("Neon Connected!"))
    .catch(err => console.log(err));

// GET ALL STUDENTS
app.get("/api/students", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM students ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }
});

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// GET ALL NEWS
app.get("/api/news", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM news ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

// ADD NEWS
app.post("/api/news", async (req, res) => {

    try {

        const { title, content } = req.body;

        await db.query(
            "INSERT INTO news(title, content, date_posted) VALUES ($1, $2, CURRENT_DATE)",
            [title, content]
        );

        res.json({
            message: "News added successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

// REGISTER STUDENT
app.post("/api/students", async (req, res) => {

    try {

        const {
            fullname,
            grade,
            section,
            email
        } = req.body;

        await db.query(
            `INSERT INTO students
            (fullname, grade_level, section, email, date_registered)
            VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
            [
                fullname,
                grade,
                section,
                email
            ]
        );

        res.json({
            message: "Student Registered Successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

// LOGIN
app.post("/api/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const result = await db.query(
            "SELECT * FROM admins WHERE username = $1 AND password = $2",
            [username, password]
        );

        if (result.rows.length > 0) {

            res.json({
                success: true
            });

        } else {

            res.json({
                success: false
            });

        }

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});