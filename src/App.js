import React from 'react';
import Loadable from 'react-loadable';

import Style from './style.js';

const Privacy = Loadable({
  loader: () => import('./components/Privacy'),
  loading() {
    return <div></div>
  }
});

const About = Loadable({
  loader: () => import('./components/About'),
  loading() {
    return <div></div>
  }
});

const Share = Loadable({
  loader: () => import('./components/Share'),
  loading() {
    return <div></div>
  }
});


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
    next: false,
    renderDetails: 0
  };

  componentDidMount() {
    if(localStorage.getItem('best') !== null) {
      this.setState({
        best:localStorage.getItem('best')
      })
    }
  }

  handleDetails = (num) => {
    this.setState({
      renderDetails: num
    })
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
      return (
        `${Style.notification} ${Style.notificationSuccess}`
      );
    }
    else if (this.state.danger === true) {
      return (
        `${Style.notification} ${Style.notificationDanger}`
      )
    } else {
      return (
        `${Style.notification}`
      )
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
      let aNumArray = new Map([...new Set(numArray)].map( x => [x, numArray.filter(y => y === x).length]));
      if (aNumArray.get(numChoice) !== 2) {
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
          let numExtract = [];
          if(!isNaN(this.state.answer.value)) {
            numExtract.push(this.state.answer.value);
          }
          else {
            numExtract = this.state.answer.value.split(" ").map(Number).filter(Boolean);
          }
          let aNumArray = new Map([...new Set(numArray)].map(x => [x, numArray.filter(y => y === x).length]));

          for(let i = 0; i < numExtract.length; i++) {
            if (aNumArray.get(numExtract[i]) > 0 && aNumArray.get(numExtract[i]) <= 2) {
              aNumArray[numExtract[i]] = aNumArray[numExtract[i]] - 1;
            }
            else {
              noMatch = true;
            }
          }

          if (noMatch === false) {
            let result = Number(eval(`(0+(${this.state.answer.value}))`));
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
              else if (result % 1 !== 0) {
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
                  this.setNotification("Success", `${score} Points Added.`, result);
                  this.changeNext();
                  this.stopTime();
                }
                else if (result < this.state.target && result > this.state.target - 10) {
                  score = result - this.state.target;
                  score = -1 * score;
                  score = 10 - score;
                  this.updateScore(score);
                  this.setNotification("Success", `${score} Points Added.`, result);
                  this.changeNext();
                  this.stopTime();
                }
                else {
                  score = 0;
                  this.setNotification("Danger", "Wrong Answer. Try Again!", result);
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
    this.hideNotification();
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
      }, () => {
        localStorage.setItem('best', this.state.best);
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
    else if (index === 1 && input.numTwo === true) {
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
      if (this.state.answer.value === '' && type === 'Number') {
        if(this.updateNum(index) !== false) {
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
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Number' && this.state.answer.openPar >= 1 && type === 'ParenthesisClose') {
        input.value = this.state.answer.value + value;
        input.type = type;
        input.openPar = input.openPar - 1;
      }
      else if (this.state.answer.value !== '' && this.state.answer.type === 'Operator' && type === 'Number') {
        if (this.updateNum(index) !== false) {
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
        if (this.updateNum(index) !== false) {
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
      else if (this.state.answer.value !== '' && this.state.answer.type === 'ParenthesisClose' && this.state.answer.openPar >= 1 && type === 'ParenthesisClose') {
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

  setTimerFlash = () => {
    if (this.state.time > 10) {
      return Style.statContainer;
    } 
    else if (this.state.time <= 10 && this.state.time > 0) {
      return (`${Style.statContainer} ${Style.dangerFlash}`);
    }
    else if (this.state.time === 0) {
      return (`${Style.statContainer} ${Style.danger}`);
    }
  };

  renderActive = (index) => {
    if (index === 0 && this.state.activeNums.numOne === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else if (index === 1 && this.state.activeNums.numTwo === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else if (index === 2 && this.state.activeNums.numThree === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else if (index === 3 && this.state.activeNums.numFour === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else if (index === 4 && this.state.activeNums.numFive === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else if (index === 5 && this.state.activeNums.numSix === false) {
      return (`${Style.numbersBlock} ${Style.inactiveButton}`);
    }
    else {
      return Style.numbersBlock;
    }
  };

  renderNew = () => {
    if (this.state.numbers.length === 0 || this.state.time === 0) {
      return (`${Style.newGame} ${Style.newGameFlash}`);
    }
    else {
      return Style.newGame;
    }
  };

  renderNext = () => {
    if (this.state.next === true && this.state.time !== 0 && this.state.numbers.length !== 0) {
      return (
        <div onClick={this.nextGame} className={`${Style.newGame} ${Style.newGameFlash}`}>Next</div>
      );
    }
    else if (this.state.next === false & this.state.time !== 0 && this.state.numbers.length !== 0) {
      return (
        <div onClick={this.checkAnswer} className={Style.newGame}>Check</div>
      );
    }
    else if (this.state.time === 0 || this.state.numbers.length === 0) {
      return (
        <div className={`${Style.newGame} ${Style.inactiveButton}`}>Check</div>
      );
    }
  };

  renderDetails = () => {
    if(this.state.renderDetails === 1) {
      return(
        <About/>
      )
    }
    else if(this.state.renderDetails === 2) {
      return(
       <Privacy/>
      )
    }
  }

  renderDetailButtons = () => {
    if (this.state.renderDetails === 0) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://upword.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Upword</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(1)}>About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(2)}>Privacy</div>
        </div>
      )
    } else if (this.state.renderDetails === 1) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://upword.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Upword</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(0)}>Hide About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(2)}>Privacy</div>
        </div>
      )
    } else if (this.state.renderDetails === 2) {
      return(
        <div className={Style.extraContent}>
          <a href="https://paypal.me/technopathic" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Buy me Coffee</a>
          <a href="https://upword.app" target="_blank" rel="noopener noreferrer" className={Style.extraButton}>Upword</a>
          <div className={Style.extraButton} onClick={() => this.handleDetails(1)}>About</div>
          <div className={Style.extraButton} onClick={() => this.handleDetails(0)}>Hide Privacy</div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className={Style.game}>
        <div className={Style.wrapperContainer}>
          <header className={Style.gameHeader}>
            <h1 className={Style.headerLogo}>Mathica</h1>
            <div className={Style.headerContainer}>
              <div className={Style.headerLeft}>
                <div className={Style.targetNumber}>
                  <span className={Style.targetContent}>{this.state.target}</span>
                  Get as close to the number as possible.
                </div>
              </div>
              <div className={Style.headerRight}>
                <div className={Style.headerStats}>
                  <div className={this.setTimerFlash()}>Time<span className={Style.statContent}>{this.state.time}</span></div>
                  <div className={Style.statContainer}>Score<span className={Style.statContent}>{this.state.score}</span></div>
                  <div className={Style.statContainer}>Best<span className={Style.statContent}>{this.state.best}</span></div>
                </div>
                <div className={Style.headerButtons}>
                  <div onClick={this.newGame} className={this.renderNew()}>New Game</div>
                  {this.renderNext()}
                </div>
              </div>
            </div>
          </header>

          <div className={this.showNotification()}>
            <div>
              {this.state.message}
            </div>
            <div>
              {this.state.currentAnswer}
            </div>
          </div>

          <main className={Style.mainContainer}>
            <div className={Style.mainHeader}>
              <div className={Style.inputContainer}>
                {this.state.answer.value}
              </div>
            </div>
            <div className={Style.wrapperMain}>
             
              <div className={Style.numbersContainer}>
                {this.state.numbers.map((num, i) => (
                  <div onClick={() => this.updateAnswer(num, "Number", i)} className={this.renderActive(i)} key={i}>{num}</div>
                ))}
              </div>

              <div className={Style.mathOperators}>
                <div className={Style.mathColumn}>
                  <div onClick={() => this.updateAnswer(" + ", "Operator")} className={Style.mathBlock}>+</div>
                  <div onClick={() => this.updateAnswer(" * ", "Operator")} className={Style.mathBlock}>x</div>
                  <div onClick={() => this.updateAnswer(" ( ", "ParenthesisOpen")} className={Style.mathBlock}>(</div>
                </div>

                <div className={Style.mathColumn}>
                  <div onClick={() => this.updateAnswer(" - ", "Operator")} className={Style.mathBlock}>-</div>
                  <div onClick={() => this.updateAnswer(" / ", "Operator")} className={Style.mathBlock}>/</div>
                  <div onClick={() => this.updateAnswer(" ) ", "ParenthesisClose")} className={Style.mathBlock}>)</div>
                </div>
              </div>
                
              <div onClick={this.clearAnswer} className={Style.clearBlock}>Clear</div>
            </div>
            <div className={Style.mainFooter}></div>
          </main>

          <div className={Style.infoBlock}>
            <span className={Style.infoImportant}>HOW TO PLAY: </span>Use the given numbers to create an equation that is as close (lower or higher) to the target number as possible or equal to it. You do not have to use all of the numbers.
          </div>
          <div className={Style.infoBlock}>
            Made with ❤ in Helsinki. Created by <span className={Style.infoImportant}><a className={Style.infoLink} href="https://twitter.com/Technopathic"  target="_blank" rel="noopener noreferrer">Technopathic</a></span>.
          </div>

          <Share/>

        </div>
        {this.renderDetailButtons()}
        {this.renderDetails()}
      </div>
    );
  };
};

export default App;