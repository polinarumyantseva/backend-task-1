const yargs = require('yargs');
const { addNotes, printNotes, removeNote } = require('./notes.controller');

yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true,
		},
	},
	handler({ title }) {
		addNotes(title);
	},
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	handler() {
		printNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id',
			demandOption: true,
		},
	},
	handler({ id }) {
		removeNote(id);
	},
});

yargs.parse();
