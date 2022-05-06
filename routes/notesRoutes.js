const express = require("express");
const { route } = require("express/lib/application");
const { readAndAppend, writeToFile, readFromFile } = require("../helper/fsUtils")
const router = express.Router();
router.use(express.json());

router.get("/api/notes", (req, res) =>
{
    readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)))
});

router.get('/api/notes/:id', (req, res) =>
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

router.post('/api/notes', (req, res) =>
{
    const bodyArr = [req.body.title, req.body.text]

    const { title, text } = bodyArr;

    if (req.body)
    {
        const newNote = {
            title,
            text,
        }


        readAndAppend(newNote, "./db/tips.json");
        res.json("Note added successfully");
    } else
    {
        res.status(400).json("Error in adding a note");
    }

})



module.exports = router;