const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');

const notesPath = path.join(__dirname, './db.json');

async function addNotes(title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	};

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.bgGreen('Note was added'));
}

async function removeNote(id) {
	let notes = await getNotes();

	notes = notes.filter((note) => note.id !== id);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.bgRed('Note was deleted'));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf8' });
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.bgBlue('Here is the list of notes:'));

	notes.forEach((note) => {
		console.log(chalk.blue(`${note.id} ${note.title}`));
	});
}

module.exports = { addNotes, removeNote, printNotes };
