const express = require("express");
const { route } = require("express/lib/application");
const { readAndAppend, writeToFile, readFromFile } = require("../helper/fsUtils")
const { v4: uuidv4 } = require("uuid");
const fs = require("fs")
const router = express.Router();
router.use(express.json());


router.get("/", (req, res) =>
{
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
});

router.get('/:id', (req, res) =>
{
    const noteId = res.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((array) =>
        {
            const write = array.filter((note) => note.noteId === noteId);
            return write.length > 0
                ? res.json(write[0])
                : res.json("No note with that ID");
        })
})

router.post('/', (req, res) =>
{
    console.log(req.body)
    const bodyArr = [req.body.title, req.body.text, req.body.id]

    const { title, text, noteId } = bodyArr;

    if (req.body)
    {
        const newNote = {
            title: bodyArr[0],
            text: bodyArr[1],
            id: uuidv4(),
        }



        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully");
    } else
    {
        res.status(400).json("Error in adding a note");
    }

})

router.delete('/:id', (req, res) =>
{
    const note = res.params.id

})

module.exports = router;