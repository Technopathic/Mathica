import React from 'react';

class App extends React.PureComponent {
  state = {
    time: 60,
    timer: null,
    best: 0,
    score: 0,
    numbers: [],
    target: 0,
    answer: { type: "", value: "", openPar: 0},
    currentAnswer: 0,
    activeNums: { numOne: true, numTwo: true, numThree: true, numFour: true, numFive: true, numSix: true },
    success: false,
    danger: false,
    message: "",
    next: false
  };

  generateNumbers = () => {
    let numArray = [];
    let numLarge = 1;
    let numChoice = 0;
    let numSum = 0;

    let numWeight = Math.floor((Math.random() * 100) + 1);
    if (numWeight <= 10) {
      numLarge = Math.floor((Math.random() * 4) + 1);
    }
    else if (numWeight > 10 && numWeight <= 30) {
      numLarge = Math.floor((Math.random() * 2) + 1);
    }
    else {
      numLarge = 1;
    }

    let largeArray = [25, 50, 75, 100];
    for(let i = 0; i < numLarge; i++) {
      numChoice = largeArray[Math.floor(Math.random() * largeArray.length)];
      numArray.push(numChoice);
      largeArray.splice(largeArray.indexOf(numChoice), 1);
    }

    while(numArray.length < 6) {
      numChoice = Math.floor((Math.random() * 10) + 1);
      let aNumArray = new Map([...new Set(numArray)].map( x => [x, numArray.filter(y => y === x). length]));
      if (aNumArray.get(numChoice) != 2) {
        numArray.push(numChoice);
      }
    }

    if (numLarge === 1) {
      numSum = Math.floor(Math.random() * (250-100+1) + 100);
    }
    else if (numLarge === 2) {
      numSum = Math.floor(Math.random() * (500-250+1) + 250);
    }
    else if (numLarge === 3) {
      numSum = Math.floor(Math.random() * (750-500+1) + 500);
    }
    else if (numLarge === 4) {
      numSum = Math.floor(Math.random() * (100-500+1) + 500);
    }

    this.setState({
      numbers: numArray,
      target: numSum
    });
  }
}