//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

//import module prompt-sync to get user input
const prompt = require("prompt-sync")();

//define global variables

//set the maximum number of rows and columns im the slot machine
const ROWS = 3;
const COLS = 3;

//all possible symbols in each reel
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

//multiplier for each symbol
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

//ask the user for a valid deposit
const getDeposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        }else {
            return numberDepositAmount;
        }
    }
};

//get the number of lines the user wants to bet on
const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        }else {
            return numberOfLines;
        }
    }
};

//get a valid bet per line from the user
const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines) {
            console.log("Invalid bet, try again.");
        }else {
            return numberBet;
        }
    }
};

//generate randomized reel symbols
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

//helper function to print columns in reels to rows for better understanding
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
};

//prints all slot machine rows in proper format
const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString)
    }
};

//determines all winnings based in rows in slot machine
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
};

//runs the game continually
const game = () => {
    let balance = getDeposit();

    while (true){
        console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }
};

game();