const express = require("express");
//requiring express

const notesRouter = require("./notesRoutes");
//connecting the notesRouter file

const app = express();
//the application should be using express

app.use("/notes", notesRouter);
//on the notes page you are using the code from the notesRouter file

module.exports = app;
//making it so i can reference this in server.js