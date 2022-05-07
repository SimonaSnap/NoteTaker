const express = require("express");
const { route } = require("express/lib/application");
const { readAndAppend, writeToFile, readFromFile } = require("../helper/fsUtils")
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { notStrictEqual } = require("assert");
//i did not add notStrictEqual - i don't use it
//i'm leaving this here just in case vs code believes that this is necessary
const router = express.Router();
router.use(express.json());
//setting up requirements and making sure that this uses router
//so instead of stating app.etc it is now router.etc


router.get("/", (req, res) =>
{
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
    //stating that i want to read what is in db.json, then parsing that data out for index.js to use and display
});

router.get('/:id', (req, res) =>
{
    const noteId = res.params.id;
    //stating that the response's parameter id is equal to noteId
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((array) =>
        {
            const write = array.filter((note) => note.noteId === noteId);
            return write.length > 0
                ? res.json(write[0])
                : res.json("No note with that ID");
            //getting the data from the file and parsing it out
            //then i filter through the array and if that noteid exists
            //we display the note
        })
})

router.delete('/:id', (req, res) =>
{
    const noteId = req.params.id

    readFromFile("./db/db.json")
        .then((inside) => JSON.parse(inside))
        .then((saved) =>
        {
            const newString = saved.filter((note) => note.id !== noteId);
            writeToFile("./db/db.json", newString);
            res.status(200).json("deleting a note");
            //check what is inside db.json
            //filter through the array of data, and if that note does not have the noteid selected
            //push it to a new array that we then rewrite the db.json file with
            //thus deleting the selected note
            //the response line is needed, so the client side knows to rerender the note list
        })
})

router.post('/', (req, res) =>
{
    //console.log(req.body)
    const bodyArr = [req.body.title, req.body.text, req.body.id]

    const { title, text, noteId } = bodyArr;

    if (req.body)
    {
        const newNote = {
            title: bodyArr[0],
            text: bodyArr[1],
            id: uuidv4(),
        }

        //this sets up what a note looks like, and what parameters it has
        //req.body.title is the user input in the title field, 
        //req.body.text is the user input in the text field

        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully");
        //takes the new note, and puts it in the readAndAppend function
        //where the data in db.json is parsed, and the new note is added as a new entry,
        //and the converted to a string and written to db.json
    }
    else
    {
        res.status(400).json("Error in adding a note");
    }
})

module.exports = router;
//makes this all visible to the server.js file