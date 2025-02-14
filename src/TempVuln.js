const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// XSS Vulnerability: Reflected XSS via user input in the query string
app.get("/", (req, res) => {
    const userInput = req.query.input || "Guest";
    res.send(`<h1>Welcome, ${userInput}!</h1>`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
