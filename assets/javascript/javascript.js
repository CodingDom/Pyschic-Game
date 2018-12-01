//Shortcut for grabbing my elements
function getElem(id) {
    return document.getElementById(id);
}

//Formatting my game statistics and elements
var gameStats = {
    wins: {value:0,text:getElem("wins")},
    losses: {value:0,text:getElem("losses")},
    remainder: {value:9,text:getElem("remainder")},
    guesses: {value:[],text:getElem("guesses")},
};

var cpuLetter;
//Starts up a new round
function newRound(status) {
    //Status is meant to check whether to add 1 to wins or losses
    if (status) {
        gameStats[status].value++;
        gameStats[status].text.textContent = gameStats[status].value;
    }
    gameStats.remainder.value = 9;
    gameStats.remainder.text.textContent = "9";
    gameStats.guesses.value = [];
    gameStats.guesses.text.textContent = "";
    cpuLetter = String.fromCharCode(Math.floor(Math.random()*26)+97); //Picking a random letter using ascii codes
};

//Checking the new guess
function checkGuess(letter) {
    if (letter == cpuLetter) {
        newRound('wins');
    }
    else if (gameStats.guesses.value.indexOf(letter) >= 0) {
        return "Already guessed that!"
    }
    else {
        gameStats.guesses.value.unshift(letter); //Adds guessed letter to beginning of array
        gameStats.guesses.text.textContent = gameStats.guesses.value;
        gameStats.remainder.value--;
        gameStats.remainder.text.textContent = gameStats.remainder.value;
        if (gameStats.remainder.value <= 0) {
            newRound('losses');
        }
    };
};

//Making sure the proper stats show
newRound();

//Event for user input
document.onkeydown = function(event){
    var key = event.key;
    var code = event.keyCode;
    //Checking if keycode matches a-z keycodes
    if (parseInt(code) >= 65 && parseInt(code) <= 90) {
        checkGuess(key);
    };
};