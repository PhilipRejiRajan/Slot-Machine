# Slot Machine

**Slot Machine** is a very basic terminal game.  I used this [video](https://youtu.be/E3XxeE7NF30?si=KuaPGWAbCq9JFCtO) to learn how to make it.

## ⚙️ Prerequisites:

+ Node.js v22.15.0
+ install package: `npm install prompt-sync`

## 🏃‍♂️‍➡️ Running the Slot Machine:

```
cd Slot Machine
npm start
```

### Output:

```
Enter a deposit amount: 1000
You have a balance of $1000
Enter the number of lines to bet on (1-3): 2
Enter the bet per line: 100
A | D | A
D | C | B
B | D | C
You won, $0
Do you want to play again (y/n)? y
You have a balance of $800
Enter the number of lines to bet on (1-3): 1
Enter the bet per line: 100
D | D | D
C | C | C
C | C | D
You won, $200
Do you want to play again (y/n)? n
```
## ✅ Testing:

+ install package: `npm install --save-dev jest`
+ running the test: `npm test`

### Sample Output:

```
 PASS  ./gameLogic.test.js
  Game Logic
    √ transpose() should correctly transpose a 2D array (4 ms)
    √ getWinnings() should return correct winnings for matching row (1 ms)                               
    √ spin() should return correct number of reels and symbols (2 ms)                                    
                                                                                                         
Test Suites: 1 passed, 1 total                                                                           
Tests:       3 passed, 3 total                                                                           
Snapshots:   0 total
Time:        0.624 s, estimated 1 s
Ran all test suites.
```