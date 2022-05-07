const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");
const api = require("./routes/main")
// requiring all the different ports and files that i might need to use in the file

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use("/api", api)
//sets up the app - which is the application, to use things like public and routers

//routes
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/notes.html"))
)
//this states that once the button that is linked to /notes is clicked then the application will go to notes.html

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);
//this states that unless the application is using /notes, the application will sit on the index.html


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
//this states that the app is listening to the port 3001, unless the heroku one is in use