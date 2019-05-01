const fs = require('fs');
const chalk = require('chalk');
const readNote = (title)=>{
    const notes =  loadNotes();
    const note = notes.find((n)=>{
        return n.title === title;
    });
    if(note) {
        console.log(chalk.green.inverse(title));
        console.log(chalk.blue(note.body));
    }else{
        console.log('error reading the note');
    }
}
const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title;
    // });
    const duplicateNote = notes.find((note) => {
        return note.title === title;
    });
    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('note added'));
    } else {
        console.log(chalk.red.inverse('duplicate titles'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => {
        if(note.title !== title) return note;
    });
    saveNotes(newNotes);
    var removed = false;
    (newNotes.length === notes.length) ? removed = false : removed = true;
    return removed;
}
const saveNotes = (notes) => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('notes.txt', data);
}
const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.txt');
        const datajson = databuffer.toString();
        const data = JSON.parse(datajson);  
        return data;
    } catch (error) {
        return [];
    }

}
const getNotes = () => {

}
const listNotes =()=>{
    const notes = loadNotes();
    console.log(chalk.blue.inverse('your notes'));
    notes.forEach(element => {
        console.log(chalk.yellow.bold(element.title));
    });
}
module.exports = {
    addNote: addNote,
    getNotes: getNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
};