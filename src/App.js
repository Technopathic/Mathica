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

  setNotification = (type, message, answer = 0) => {
    if (type === "Success") {
      this.setState({
        success:true,
        message: message,
        currentAnswer: answer
      })
    } else if (type === "Danger") {
      this.setState({
        danger: true,
        message: message,
        currentAnswer: answer
      })
    }

    setTimeout(this.hideNotification, 5000);
  };

  showNotification = () => {
    if (this.state.success === true) {

    }
    else if (this.state.danger === true) {

    } else {

    }
  };

  hideNotification = () => {
    this.setState({
      success:false,
      danger:false,
      message: ""
    })
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
  };

  checkAnswer = () => {
    let score = 0;
    let noMatch = false;

    if (this.state.answer.value !== "") {
      if(this.state.answer.openPar > 0) {
        this.setNotification("Danger", "You forgot to close a parenthesis.", "");
      }
      else {
        if(this.state.answer.type === "Operator") {
          this.setNotification("Danger", "This is not a valid equation.", "");
        }
        else {
          let numArray = this.state.numbers;
          let numExtract = this.state.answer.value.split(" ").map(Number).filter(Boolean);
          let aNumArray = new Mp([...new Set(numArray)].map(x => [x, numArray.filter(y => y === x).length]));

          for(let i = 0; i < numExtract.length; i++) {
            if (aNumArray.get(numExtract[i]) > 0 && aNumArray.get(numExtract[i]) <= 2) {
              aNumArray[numExtract[i]] = aNumArray[numExtract[i]] - 1;
            }
            else {
              noMatch = true;
            }
          }

          if (noMatch === false) {
            let result = Number(eval('(0+(' + this.state.answer.value + '))'));
            if (isNaN(result) === true) {
              this.setNotification("Danger", "This is not a valid equation.", "");
            }
            else {
              if (isFinite(result) === false) {
                result = "";
                this.setNotification("Danger", "You cannot Divide by Zero.", result);
              }

              if (result < 0) {
                result = "";
                this.setNotification("Danger", "You cannot have Negative Numbers.", result);
              }
              else if (result % 1 != 0) {
                result = "";
                this.setNotification("Danger", "You cannot have a Decimal.", result);
              }
              else {
                if (result === this.state.target) {
                  score = 10;
                  this.updateScore(score);
                  this.setNotification("Success", "10 Points Added.", result);
                  this.changeNext();
                  this.stopTime();
                }
                else if (result > this.state.target && result < this.state.target + 10) {
                  score = result - this.state.target;
                  score = 10 - score;
                  this.updateScore(score);
                  this.setNotification("Success", score + " Points Added.", result);
                  this.changeNext();
                  this.stopTime();
                }
                else if (result < this.state.target && result > this.state.target - 10) {
                  score = result - this.state.target;
                  score = -1 * score;
                  score = 10 - score;
                  this.updateScore(score);
                  this.setNotification("Success", score + " Points Added.", result);
                  this.changeNext();
                  this.stopTime();
                }
                else {
                  score = 0;
                  this.setNofication("Danger", "Wrong Answer. Try Again!", result);
                }
              }
            }
          } else {
            this.setNotification("Danger", "You've somehow managed to use numbers outside of this game.", "");
          }
        }
      }
    } else {
      this.setNotification("Danger", "Nothing to check.", "");
    }
  };

  newGame = () => {
    this.setState({
      score: 0,
      answer: {type: "", value: "", openPar: false},
      currentAnswer: 0,
      activeNums: {numOne: true, numTwo: true, numThree: true, numFour: true, numFive: true, numSix: true},
      next: false,
      time: 60
    });
    this.generateNumbers();
    this.hideNotification();
    this.stopTime();
    this.startTime();
  };

  nextGame = () => {
    this.setState({
      answer: {type: "", value: "", openPar: false},
      currentAnswer: 0,
      activeNums: {numOne: true, numTwo: true, numThree: true, numFour: true, numFive: true, numSix: true},
      time: 60
    });

    this.generateNumbers();
    this.hideNotifications();
    this.changeNext();
    this.stopTime();
    this.startTime();
  };

  changeNext = () => {
    this.setState({ next:!this.state.next })
  };

  updateScore = (score) => {
    let newScore = this.state.score + score;
    this.setState({
      score: newScore
    });

    if (newScore > this.state.best) {
      this.setState({
        best: newScore
      });
    }
  };

  clearAnswer = () => {
    this.setState({
      answer: {type: "", value: "", openPar: false},
      activeNums: {numOne: true, numTwo: true, numThree: true, numFour: true, numFive:true, numSix: true}
    });
    this.hideNotification();
  };

  updateNum = (index) => {
    let input = {
      numOne: this.state.activeNums.numOne, 
      numTwo: this.state.activeNums.numTwo, 
      numThree: this.state.activeNums.numThree, 
      numFour: this.state.activeNums.numFour, 
      numFive: this.state.activeNums.numFive, 
      numSix: this.state.activeNums.numSix
    };

    if (index === 0 && input.numOne === true) {
      input.numOne = false;
    }
    else if (index === 1 && input.numTwo == true) {
      input.numTwo = false;
    }
    else if (index === 2 && input.numThree === true) {
      input.numThree = false;
    }
    else if (index === 3 && input.numFour === true) {
      input.numFour = false;
    }
    else if (index === 4 && input.numFive === true) {
      input.numFive = false;
    }
    else if (index === 5 && input.numSix === true) {
      input.numSix = false;
    }
    else {
      return false;
    }

    this.setState({
      activeNums: input
    });
  };

  updateAnswer = (value, type, index = 0) => {
    if (this.state.timer !== null && this.state.time !== 0) {
      let input = { type: this.state.answer.type, value: this.state.answer.value, openPar: this.state.answer.openPar };
      if (this.state.answer.value == '' && type == 'Number') {
        if(this.updateNum(index) != false) {
          input.value = value;
          input.type = type;
        }
      }
      else if (this.state.answer.value === '' && type === 'ParenthesisOpen') {
        input.value = value;
        input.type = type;
        input.openPar = input.openPar + 1;
      }
      else if (this.state.answer.value === '' && type === 'Operator') {
        console.log('Cannot place an Operator at the Beginning.');
      }
      else if (this.state.answer.value === '' && type === 'ParenthesisClose') {
        console.log('Nothing to close.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Number' && type === 'Number') {
        console.log('Cannot place a Number next to another Number.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Number' && type === 'ParenthesisOpen') {
        input.value = this.state.answer.value + ' *' + value;
        input.type = type;
        input.openPar = input.openPar + 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Number' && type === 'Operator') {
        input.value = this.state.answer.value + value;
        input.type = type;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Number' && this.state.answer.openPar != 0 && type === 'ParenthesisClose') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar - 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Operator' && type === 'Number') {
        if (this.updateNum(index) != false) {
          input.value = this.state.answer.value + value;
          input.type = type;
        }
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Operator' && type === 'Operator') {
        input.value = input.value.slice(0, -3);
        input.value = input.value + value;
        input.type = type;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Operator' && type === 'ParenthesisOpen') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar + 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Operator' && type === 'ParenthesisClose') {
        console.log('Cannot place an operator next to another operator.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisOpen' && type === 'Number') {
        if (this.updateNum(index) != false) {
          input.value = this.state.answer.value + value;
          input.type = type;
        }
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisOpen' && type === 'ParenthesisOpen') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar + 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisOpen' && type === 'Operator') {
        console.log('Cannot place an operator next to another operator.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisOpen' && type === 'ParenthesisClose') {
        console.log('Cannot place an operator next to another operator.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisClose' && type === 'Number') {
        console.log('Cannot place an operator next to a closing parenthesis.');
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisClose' && type === 'Operator') {
        input.value = this.state.answer.value + value;
        input.type = type;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisClose' && type === 'ParenthesisOpen') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar + 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisClose' && this.state.answer.openPar != 0 && type === 'ParenthesisClose') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar - 1;
      }

      this.setState({
        answer: input
      });
    }
  };

  updateTime = () => {
    let i = this.state.time;
    i--;
    if ( i < 0 ) {
      this.stopTime();
    }
    else {
      this.setState({
        time: i
      });
      this.startTime();
    }
  };

  startTime = () => {
    this.setState({ timer: setTimeout(this.updateTime, 1000 )});
  };

  stopTime = () => {
    clearTimeout(this.state.timer);
    this.setState({
      timer:null
    });
  };

  renderTimerFlash = () => {

  };

  renderActive = () => {

  };

  renderNew = () => {

  };

  renderNext = () => {

  };
  
}