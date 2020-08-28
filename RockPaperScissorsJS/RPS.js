//BUTTONS

const gameStart = document.getElementById('startRestartGame');
const rockButton = document.getElementById('playRock');
const paperButton = document.getElementById('playPaper');
const scissorsButton = document.getElementById('playScissors');

// OUTPUT SPANS

const gamesPlayedCounter = document.getElementById("gamesPlayedCounter");
const winsCounter = document.getElementById("winsCounter");
const losesCounter = document.getElementById("losesCounter");
const drawsCounter = document.getElementById("drawsCounter");
// THE HORIZONTAL LINE WILL  SPLIT THE OUTPUTS HERE
const playerLastChoice = document.getElementById("playerLastChoice");
const computerLastChoice = document.getElementById("computerLastChoice");
const lastGameWinner = document.getElementById("lastGameWinner");

// INITIALIZING GLOBAL VARIABLES, THE DEFAULT VALUES ARE SIMPLY PLACEHOLDERS WHICH DO NOTHING EXCEPT FOR WASTING RESOURCES BUT WHATEVER
// THEY'LL GET QUITE HANDY BEFORE LONG

let gamesPlayed = gamesPlayedCounter.textContent;
let wins = winsCounter.textContent;
let loses = losesCounter.textContent;
let draws = drawsCounter.textContent;

let yourChoice = playerLastChoice.textContent;
let computerChoice = computerLastChoice.textContent;
let winnerIs = lastGameWinner.textContent;

let gameNotInitialized = true;  // IF IT'S TRUE, IT WILL BLOCK ROCK, PAPER AND SCISSORS BUTTON FROM FUNCTIONING. I ADDED THIS JUST TO MAKE YOUR DAY WORSE.

// FUNCTIONS START HERE


gameStart.onclick = function(){                                 // SETS THE VARIABLES' VALUE TO SOMETHING USABLE AND ACTUALLY ALLOWS YOU TO PLAY THE GAME AT ALL
    gamesPlayed = gamesPlayedCounter.textContent = 0;   // YOU CAN ALSO USE THIS BUTTON TO RESET THE RESULTS
    wins = winsCounter.textContent = 0;
    loses = losesCounter.textContent = 0;
    draws = drawsCounter.textContent = 0;
    gameNotInitialized = false;                   // CLICKING THE BUTTON WILL SET THE TROLOLO VARIABLE FALSE ALLOWING YOU TO PLAY UNTIL YOU REFRESH THE PAGE
    yourChoice = playerLastChoice.textContent = "NONE";
    computerChoice = computerLastChoice.textContent = "NONE";
    winnerIs = lastGameWinner.textContent = "N/A";
}



rockButton.onclick = function(){  // CLICK THIS IF YOU WANNA PLAY ROCK
    if (gameNotInitialized){
        alert("You have to initialize the game first...")
     } else {
        yourChoice = "rock";
        computerChoice = rollComputerChoice();
    }
}


paperButton.onclick = function(){     // PLAY PAPER
    if (gameNotInitialized){
        alert("You have to initialize the game first...")
     } else {
        yourChoice = "paper";
        computerChoice = rollComputerChoice();
    }
}
scissorsButton.onclick = function(){     //PLAY SCISSORS
    if (gameNotInitialized){
        alert("You have to initialize the game first...")
     } else {
        yourChoice = "scissors";
        computerChoice = rollComputerChoice();
    }
}

function rollComputerChoice(){                              // CONVERTS A RANDOM INTEGER FROM 1 TO 3 INTO ROCK, PAPER OR SCISSORS FOR THE COMPUTER'S CHOICE
    let numberToChoice = getRandomTimesThree();
        switch(numberToChoice){
            case 1:
                computerChoice = "rock";
                break;
            case 2:
                computerChoice = "paper";
                break;
            case 3:
                computerChoice = "scissors";
                break;
            default:
                computerChoice = alert("The computer hasn't chosen any number. If you see this, something wrong has happened.")
        } //switch ends here
        return evaluateResult();
}

function getRandomTimesThree(){         //GETS A RANDOM INTEGER WHICH IS EITHER 1 OR 2 OR 3
    let numberling = Math.random() * 3;
    return Math.ceil(numberling)
}

function evaluateResult(){
    if (yourChoice === computerChoice) {
        winnerIs = "Nobody!"
    } else if (yourChoice === "rock" && computerChoice === "scissors" || yourChoice === "paper" && computerChoice === "rock" || yourChoice ==="scissors" && computerChoice === "paper"){
        winnerIs = "Player";
    } else if (yourChoice === "rock" && computerChoice === "paper" || yourChoice === "paper" && computerChoice === "scissors" || yourChoice === "scissors" && computerChoice === "rock"){
        winnerIs = "Computer";
    }
    return updateContent();
}
function updateContent(){
    gamesPlayed += 1;
    gamesPlayedCounter.textContent = gamesPlayed;
    switch(winnerIs){
        case "Player":
            wins += 1;
            winsCounter.textContent = wins;
            break;
        case "Computer":
            loses +=1;
            losesCounter.textContent = loses;
            break;
        case "Nobody!":
            draws += 1;
            drawsCounter.textContent = draws;
    }
    playerLastChoice.textContent = yourChoice;
    computerLastChoice.textContent = computerChoice;
    lastGameWinner.textContent = winnerIs;
}  // And it's done. Now let's allow the user to change fonts.

const useComicSans = document.getElementById("fontComicSans");
const useHelvetica = document.getElementById("fontHelvetica");
const useTMR = document.getElementById("fontTMR");
const useConsolas = document.getElementById("fontConsolas");
const generalPage = document.querySelector("html");
const fontIndicator = document.getElementById("currentFont");

useComicSans.onclick = function(){
    generalPage.style.fontFamily = '"Comic Sans MS", sans-serif';
    fontIndicator.textContent = "Comic Sans";
}
useHelvetica.onclick = function(){
    generalPage.style.fontFamily = 'Helvetica, sans-serif';
    fontIndicator.textContent = "Helvetica";
}
useTMR.onclick = function(){
    generalPage.style.fontFamily = '"Times New Roman", serif'
    fontIndicator.textContent = "Times New Roman";
}
useConsolas.onclick = function(){
    generalPage.style.fontFamily = '"Consolas", monospace';
    fontIndicator.textContent = "Consolas";
}


//alert("You have chosen " + yourChoice + "\nThe computer has chosen " + computerChoice)

// CONSOLE LOGS FOR TESTING
console.log(gamesPlayed);
console.log(wins);
console.log(loses);
console.log(draws);
console.log(yourChoice);
console.log(computerChoice);
console.log(winnerIs);

