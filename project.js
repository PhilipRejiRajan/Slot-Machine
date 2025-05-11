//1. deposit some money
//2. determine number of lines to bet on
//3. collect a bet amount
//4. spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

//import module prompt-sync to get user input
const prompt = require("prompt-sync")();

//import module gameLogic to run slot functions
const {spin, transpose, getWinnings} = require('./gameLogic');

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