const chalk = require("chalk");
const fs = require("fs");

function addNotes(title, body) {
  let notes = loadNotes();

  let duplicateNote = notes.find((note) => note.title === title);

  // node inspect then opening chrome with url chrome://inspect will allow one to open the the devtools debugger then everywhere debugger is in the code is a breakpoint
  // debugger;

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title already taken"));
  }
}
function removeNotes(title) {
  const notes = loadNotes();
  let remainingNotes = notes.filter((note) => {
    if (note.title === title) {
      return false;
    } else {
      return true;
    }
  });
  if (notes.length == remainingNotes.length) {
    console.log(chalk.red.inverse("Note not found or does not exist"));
  } else {
    console.log(chalk.green.inverse(title + " has been removed"));
    saveNotes(remainingNotes);
  }
}
function listNotes() {
  const notes = loadNotes();
  console.log(chalk.yellow.bold("\t\tYour Notes"));
  notes.forEach((note) => {
    console.log(note.title);
  });
}
function readNotes(title) {
  const notes = loadNotes();

  let noteToBeRead = notes.find((note) => note.title === title);
  if (noteToBeRead) {
    console.log(chalk.yellow.inverse(noteToBeRead.title));
    console.log(noteToBeRead.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
}

function saveNotes(notes) {
  let notesJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJson);
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNotes,
  removeNotes,
  listNotes,
  readNotes,
};
