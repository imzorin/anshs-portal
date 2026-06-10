const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MYSQL CONNECTION
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("MySQL Connected!");
});

// GET ALL STUDENTS
app.get("/api/students", (req, res) => {

    db.query(
        "SELECT * FROM students ORDER BY id DESC",
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            res.json(result);

        }
    );

});

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// GET ALL NEWS
app.get("/api/news", (req, res) => {

    db.query(
        "SELECT * FROM news ORDER BY id DESC",
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json(result);

        }
    );

});

// ADD NEWS
app.post("/api/news", (req, res) => {

    const { title, content } = req.body;

    db.query(
        "INSERT INTO news(title, content, date_posted) VALUES (?, ?, CURDATE())",
        [title, content],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "News added successfully!"
            });

        }
    );

});

// REGISTER STUDENT
app.post("/api/students", (req, res) => {

    const {
        fullname,
        grade,
        section,
        email
    } = req.body;

    db.query(
        `INSERT INTO students
        (fullname, grade_level, section, email, date_registered)
        VALUES (?, ?, ?, ?, CURDATE())`,
        [
            fullname,
            grade,
            section,
            email
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "Student Registered Successfully!"
            });

        }
    );

});

// LOGIN
app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false
                });

            }

            if (result.length > 0) {

                res.json({
                    success: true
                });

            } else {

                res.json({
                    success: false
                });

            }

        }
    );

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});