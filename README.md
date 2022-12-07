# shuffleFiles
simple node project for shuffling files in a directory by adding `pX - ` to the beginning of the file name, where X is a number between 1 and how many files there are in the directory.

to use, change the `filePath` variable to the path of the directory you want to shuffle, and run `npm run shuffle`.

to restore a directory, change the file path, and then change `shuffleFiles` to false, and run `npm run shuffle`.