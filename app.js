const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
yargs.version('1.1.0');
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title'
            , demandOption: true
            , type: 'string'
        }
        , body: {
            describe: 'note body'
            , demandOption: true
            , type: 'string'
        }
    },
    handler:  (argv)=> {
        notes.addNote(argv.title, argv.body);  
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a new note',
    builder: {
        title: {
            describe: 'note title'
            , demandOption: true
            , type: 'string'
        }
    },
    handler:  (argv) =>{
        const removed = notes.removeNote(argv.title);
        removed === true ? console.log(chalk.green.inverse("removed successfully")) : console.log(chalk.red.inverse("note not found")) ;

    }
})
yargs.command({
    command: 'list',
    describe: 'listing notes',
    handler:  ()=> {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'reading notes',
    handler:  (argv)=> {
        notes.readNote(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv);
