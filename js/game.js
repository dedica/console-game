const pool = {
    movies: [
        "Midnight Run",
        "The Godfather",
        "The Revenant",
        "Black Mass"
    ],
    songs: [
        "Change the World",
        "Tears in Heaven",
        "Bad Love",
        "Let It Rain"
    ],
    paintings: [
        "Mona Lisa",
        "Girls at the Piano",
        "Guernica",
        "The Third of May 1808"
    ]  
};
        
const settings = {
    started: false,
    selectedItem: [],
    maxWrongGuesses: 5,
    wrongGuesses: 0
};

function instructions() {
    console.log("INSTRUCTIONS:")
    console.log(`Start the game: start("movies") or
            start("songs") or
            start("paintings")`);
    console.log(`Make a letter-guess for example: guess("a")`);
    console.log(`Make a final-guess for example: finalGuess("Change the World")`);
}
instructions();

function randomNum(arrayLength) {
    if (arrayLength > 0) {
        return Math.floor(Math.random() * arrayLength);
    } else {
        return "Empty array!";
    }
}

function changeToUpper(category) {
    for (let i = 0; i < pool[category].length; i++) {
        pool[category][i] = pool[category][i].toUpperCase();
    }
}

function start(artType) {

    if (!settings.started) {  

        // if category is provided
        if (artType) {  

            // make sure there is at least one item under the category
            if (pool[artType].length < 1) {           
                return "Empty category!";     
            } else {  

                // randomly choose item
                let randomItem = randomNum(pool[artType].length);

                // start the game by turning settings.started to true
                settings.started = true;

                // turn string-parameter to UPPERCASE
                changeToUpper(artType);

                // turn selected item into array of characters
                settings.selectedItem = pool[artType][randomItem].split("");

                // create a puzzle out of selected item
                let puzzleArr = settings.selectedItem.map(function (letter) {
                    if (letter !== " ") {
                        return letter = "_";
                    } else {
                        return letter;
                    }
                });

                // add the puzzle to settings
                settings.puzzle = puzzleArr;

                // turn puzzle into string
                settings.puzzleStr = settings.puzzle.join(" ");

                // print the puzzle
                return settings.puzzleStr;
            }

        } else {
            return "Please select the category (movies, songs or paintings).";
        }

    } else {
        return "The game has been already started!";
    }  
}

function guess(char) {

    // make sure the game is on
    if (settings.started) {

        // turn the parameter into UPPERCASE 
        char = char.toUpperCase();

        let checkLetter = settings.selectedItem.filter(function (letter, i) {
            if (letter === char) {
                return settings.puzzle.splice(i, 1, char);
            } 
        });


        if (checkLetter < 1) {
            settings.wrongGuesses++;
            if (settings.wrongGuesses === settings.maxWrongGuesses) {
                settings.started = false;
                settings.wrongGuesses = 0;
                return `Game Over! The title of item is "${settings.selectedItem.join("")}"`;
            } else {
                return `There is no letter ${char} in the puzzle. Wrong guesses so far: ${settings.wrongGuesses}`;
            }
        }

        settings.puzzleStr = settings.puzzle.join(" ");
        return settings.puzzleStr;

    } else {
        return "Before guessing, you have to start the game.";
    } 
}

function finalGuess(title) {

    if (settings.started) {
        title = title.toUpperCase();

        if (title === settings.selectedItem.join("")) {
            settings.started = false;
            return `Congrats. The title is ${title}`;
        } else {
            settings.wrongGuesses++;
            if (settings.wrongGuesses === settings.maxWrongGuesses) {
                settings.started = false;
                settings.wrongGuesses = 0;
                return `Game Over! The title of item is "${settings.selectedItem.join("")}"`;
            } else {
                return `Guessed ${title} is not correct. Wrong guesses so far: ${settings.wrongGuesses}`;
            }
        }

    } else {
        return "Before guessing, you have to start the game.";
    }
}
