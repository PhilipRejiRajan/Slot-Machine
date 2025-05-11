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

module.exports = {
    spin,
    transpose,
    getWinnings
};