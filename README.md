### Mathica

[Play Mathica](https://mathica.app)

Mathica is my React mathematics game which uses the same concept from the British TV game-show, Countdown.

For the non-Brits in the audience, there's a segment of a daytime game-show where contestants have a set of 6 numbers and a randomly generated target number. They have to reach the target number using any (but not necessarily all) of the 6 numbers using only arithmetic operators. All calculations must be positive integers.

An example: [Youtube: Countdown - The Most Extraordinary Numbers Game Ever?](http://www.youtube.com/watch?v=pfa3MHLLSWI)

A detailed description is given on Wikipedia: [Countdown (Game Show)](https://en.wikipedia.org/wiki/Countdown_%28game_show%29#Numbers_round)

## How does it Work?
Unlike the game-show, you do not select the size of your integers, rather the program will select them for you. You will have no less than 1 and no more than 4 large numbers, while the rest of the 6 will be numbers from 1 through 10, doubles allowed. Depending on the size of your integers, the target integer is generated ranging from 100 to 1000.

## How to Play?
Similarly to the game-show, you must submit an equation that equals a number that is as close to the target integer as possible using the assigned integers.  You may only use each integer once and can only use basic arithmetic operations, such as addition, subtraction, multiplication, and division. You have 60 seconds to submit your equation.

Depending on how close you are to the target integer (either upper or lower bound), your score will be calculated by your distance. For example, if you reach the target integer exactly, you will be awarded 10 points. If you are one off, you will be given 9 points, two off will be 8 points, and so on. The upper and lower bounds of the point system are 10, so beyond that you will receive no points. If you use a number in your equation that does not exist in the assigned integers, you will receive no points.

## Differences from the Game Show
I would say that my scoring system is a bit more lenient and rewarding. It is this way because there's no guarantee the assigned integers will equate to the target integer (remember, the goal is to get as close as possible). My program also uses 60 seconds instead of 30 seconds because you must submit your answer within that 60 second timeframe to prevent cheating by using more time than allowed. I wanted to make the game a little more fast-paced, so I also omitted the choices of large integer sizes and declaring an answer integer. The amount of large integers is decided based on weighted random generation. My game also lacks Rachel Riley, which is disappointing.