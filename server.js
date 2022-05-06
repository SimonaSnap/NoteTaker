const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require("uuid")
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded)
app.use(express.static("public"));

//routes


app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/notes.html"))
)

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);