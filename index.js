const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}


async function moveFile(source, destination) {
	try {
		await fsp.rename(source, destination);
		console.log(`Moved file ${source} to ${destination}`);
	} catch (error) {
		console.error(`Got an error trying to move the file: ${error.message}`);
	}
}

const filePath = `/home/rhi/music`;
const shuffleFiles = false;

console.log(`File Path: ${filePath}`);
//passsing directoryPath and callback function
fs.readdir(filePath, async function (err, files) {
	//handling error
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}

	await (async() => {
		if (shuffleFiles) {
			let smfiles = shuffle(files);
			for (let i = 0; i < smfiles.length; i++) {
				let source = path.join(filePath, smfiles[i]);
				let destination = path.join(filePath, `p${i + 1} - ${smfiles[i]}`);
				await moveFile(source, destination);
			}
		} else {
			for (let i = 0; i < files.length; i++) {
				let source = path.join(filePath, files[i]);
				let dest = files[i].replace(/p[0-9]+ - /, '')
				let destination = path.join(filePath, dest);
				await moveFile(source, destination);
			}
		}
	})();
});
