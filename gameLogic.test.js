//import module gameLogic to run slot functions
const {spin, transpose, getWinnings} = require('./gameLogic');

//grouping related test cases
describe('Game Logic', () => {

    //test case for transpose() function
    test('transpose() should correctly transpose a 2D array', () => {

        const reels = [
            ['A', 'B', 'C'],
            ['D', 'E', 'F'],
            ['G', 'H', 'I']
        ];

        const expected = [
            ['A', 'D', 'G'],
            ['B', 'E', 'H'],
            ['C', 'F', 'I']
        ];
        
        expect(transpose(reels)).toEqual(expected); //test verification
    });

    //test case for getWinnings() function
    test('getWinnings() should return correct winnings for matching row', () => {

        const rows = [
            ['A', 'A', 'A'], //line 1: win
            ['B', 'C', 'B'], //line 2: no win
            ['D', 'D', 'D']  //line 3: win if lines = 3
        ];

        expect(getWinnings(rows, 10, 1)).toBe(50); //A: 5 * 10
        expect(getWinnings(rows, 10, 3)).toBe(50 + 20); //A + D
    });

    //test case for spin() function
    test('spin() should return correct number of reels and symbols', () => {
        
        const reels = spin();
        expect(reels.length).toBe(3); //checks for 3 columns
        for (const reel of reels){
            expect(reel.length).toBe(3); //checks for 3 rows per column
            for (const symbol of reel){
                expect(['A','B','C','D']).toContain(symbol); //checks for valid symbols
            }
        }
    });
});