const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// CSRF Vulnerability: No CSRF token validation
app.post("/update-profile", (req, res) => {
    const { username, email } = req.body;
    console.log(`Updated profile: ${username}, ${email}`);
    res.send("Profile updated!");
});

// XSS Vulnerability: User input is reflected without sanitization
app.get("/greet", (req, res) => {
    const name = req.query.name;
    res.send(`<h1>Hello, ${name}!</h1>`); // Vulnerable to <script>alert(1)</script>
});

// Path Traversal Vulnerability: Allows accessing arbitrary files on the server
app.get("/read-file", (req, res) => {
    const filePath = req.query.file; // User-controlled input
    const fullPath = path.join(__dirname, "files", filePath);
    
    fs.readFile(fullPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file.");
        }
        res.send(`<pre>${data}</pre>`);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
