const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);
//this allows us to then add .then kind of code after reading the file

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`Data written to ${destination}`)
    )
//this takes the final data from the readAndAppend function and writes it to the desired destination

const readAndAppend = (content, file) =>
{
    fs.readFile(file, "utf8", (err, data) =>
    {
        if (err)
        {
            console.log(err)
        } else
        {
            const parsed = JSON.parse(data);
            parsed.push(content);
            writeToFile(file, parsed);
        }
    })
}
//this would check what already exists in the db.json file
//if not empty, it will parse the data out, add the new note on the end and then send it
//to the writeToFile function that will stringify it and save the json

module.exports = { readFromFile, writeToFile, readAndAppend }