import { css, keyframes } from 'emotion';

const game = css`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  min-height:100vh;
  color:#3f3f3f;
  font-family: sans-serif;
  background: rgb(255,220,221);
  background: linear-gradient(135deg, rgba(255,220,221,1) 0%,rgba(253,166,169,1) 100%);
`;

const wrapperContainer = css`
  width:100%;
  max-width: 700px;
  display:flex;
  flex-direction:column;
`;

const headerLogo = css`
  text-align: center;
  font-size: 3em;
  border-bottom: 1px solid #3f3f3f;
  margin: 0;
  padding: 10px;
  text-transform:uppercase;
  font-weight: bold;
  font-feature-settings: "c2sc";
`;

const gameHeader = css`
  display:flex;
  flex-direction:column;
  width:100%;
  max-width:600px;
  margin:0 auto;
`;

const headerContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  padding: 15px;
  border-bottom: 1px solid #3f3f3f;

  @media only screen and (max-width : 425px) {
    flex-direction: column-reverse;
  }
`;

const headerLeft = css`
  order: 1;
`;

const headerRight = css`
  display: flex;
  flex-direction: column;
  order:2;

  @media only screen and (max-width : 425px) {
    margin-bottom:15px;
  }
`;

const headerStats = css`
  display: flex;
  margin:0 auto;
`;

const statContainer = css`
  background: #3f3f3f;
  border-radius: 5px;
  color: #EEEEEE;
  padding:15px 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  margin: 5px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const statContent = css`
  color: #fffff9;
  font-size: 1.4em;
`;

const headerButtons = css`
  display: flex;
  flex-direction: row;
`;

const newGame = css`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
  background: #42363b;
  border-radius: 5px;
  margin: 5px;
  text-align: center;
  font-size: 1.2em;
  color: #fff4da;
  font-weight: bold;
  cursor:pointer;
  user-select:none;
`;

const targetNumber = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #3f3f3f;
`;

const targetContent = css`
  width: 100px;
  font-size: 4em;
  color: #3f3f3f;
  margin: 0 auto;
  font-weight: bold;
`;

const inputContainer = css`
  background: transparent;
  color: #f7f4ff;
  font-weight: bold;
  font-size: 1.6em;
  padding:10px;
  flex-grow:1;
`;

const numbersContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const numbersBlock = css`
  padding: 20px 10px;
  width: 15%;
  box-sizing:  border-box;
  text-align: center;
  border: 1px solid #f5adbe;
  color: #f7f4ff;
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  user-select:none;
`;

const mathColumn = css`
  width: 50%;
`;

const mathBlock = css`
  margin: 15px;
  text-align: center;
  border: 1px solid #f5adbe;
  color: #f7f4ff;
  font-weight: bold;
  font-size: 2em;
  border-radius: 5px;
  display: block;
  cursor: pointer;
  padding-top:5px;
  padding-bottom:5px;
  user-select:none;
`;

const clearBlock = css`
  margin: 15px;
  border: 1px solid #f5adbe;
  color: #f7f4ff;
  font-weight: bold;
  font-size: 1.8em;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  border-radius: 5px;
  cursor: pointer;
  padding-top:5px;
  padding-bottom:5px;
  text-transform:uppercase;
  user-select:none;
`;

const inactiveButton = css`
  background: rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  user-select:none;
`;

const newGameKey = keyframes`
  0%   {background-color: #42363b;}
  50%  {background-color: #8b8b8b;}
  100% {background-color: #42363b;}
`;

const newGameFlash = css`
  animation-name:  ${newGameKey};
  animation-duration:  3s;
  animation-iteration-count:  infinite;
`;

const dangerKey = keyframes`
  0%   {background-color: #e07572;}
  50%  {background-color: #eca9a7;}
  100% {background-color: #e07572;}
`;

const dangerFlash = css`
  animation-name:  ${dangerKey};
  animation-duration:  2s;
  animation-iteration-count:  infinite;
`;

const danger = css`
  background: #e07572 !important;
`;

const notification = css` 
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
  font-weight: bold;
  display: none;
  opacity: 0;
  transition: visibility 0s linear 0.5s,opacity 0.5s linear;
`;

const notificationSuccess = css`
  background: #cee9ce;  
  border: 1px solid #9dd49d;
  color:  #499349;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  opacity: 1;
  transition-delay: 0s;
`;

const notificationDanger = css`
  background: #f2c7c6;
  border: 1px solid #ecacaa;
  color:  #b35d5b;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  opacity: 1;
  transition-delay: 0s;
`;

const infoBlock = css`
  padding: 15px;
  color: #3f3f3f;
  font-size: 1.1em;
  margin: 0 auto;
  text-align: center;
`;

const infoLink = css`
  color: #3f3f3f;
  text-decoration:none;
`;

const infoImportant = css`
  font-weight: bold;
`;

const mathOperators = css`
  display:flex;
  flex-direction:row;
`;

const mainContainer = css`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin-top:30px;
  margin-bottom:20px;
`;

const wrapperMain = css`
  background: rgb(251,108,115);
  background: linear-gradient(135deg, rgba(251,108,115,1) 0%,rgba(243,99,120,1) 44%,rgba(237,92,126,1) 65%,rgba(229,84,130,1) 82%,rgba(199,62,128,1) 100%);
  padding:15px 30px;
  border-radius:5px;
  width:100%;
  max-width:700px;
  box-shadow:0 0 30px 0 rgba(0, 0, 0, 0.5);
  border:3px solid #fc6d74;
  box-sizing: border-box;

  @media only screen and (max-width : 650px) {
    border-radius:0px;
  }

  @media only screen and (max-width : 425px) {
    padding:15px 5px;
    border:none;
    border-radius:0px;
  }
`;

const mainHeader = css`
  width:100%;
  max-width:650px;
  background:#3f3f3f;
  height:55px;
  display:flex;
  flex-direction:row;
  align-items:center;
  border-radius: 5px 5px 0 0;
  border-left:1px solid #777777;
  border-right:1px solid #777777;
  border-top:1px solid #777777;
  box-shadow:0 0 30px 0 rgba(0, 0, 0, 0.5);

  @media only screen and (max-width : 425px) {
    border:none;
  }
`;

const mainFooter = css`
  width:100%;
  max-width:650px;
  background:#3f3f3f;
  height:15px;
  border-radius: 0 0 5px 5px;
  border-left:1px solid #777777;
  border-right:1px solid #777777;
  border-top:1px solid #777777;
  box-shadow:0 0 30px 0 rgba(0, 0, 0, 0.5);

  @media only screen and (max-width : 425px) {
    border:none;
  }
`;

const extraContent = css`
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:center;
  margin-top:10px;
  margin-bottom:15px;
  @media only screen and (max-width : 425px) {
    flex-direction: column;
  }
`;

const extraButton = css`
  text-transform:uppercase;
  font-size:0.9em;
  font-weight:bold;
  background: #42363b;
  color: #fff4da;
  padding:15px 30px;
  margin:1%;
  border-radius:5px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  text-decoration:none;
  user-select:none;
`;

export default {
    game,
    wrapperContainer,
    headerLogo,
    gameHeader,
    headerContainer,
    headerLeft,
    headerRight,
    headerStats,
    statContainer,
    statContent,
    headerButtons,
    newGame,
    targetNumber,
    targetContent,
    inputContainer,
    numbersContainer,
    numbersBlock,
    mathColumn,
    mathBlock,
    clearBlock,
    inactiveButton,
    newGameKey,
    newGameFlash,
    dangerKey,
    dangerFlash,
    danger,
    notification,
    notificationSuccess,
    notificationDanger,
    infoBlock,
    infoLink,
    infoImportant,
    mathOperators,
    mainContainer,
    wrapperMain,
    mainHeader,
    mainFooter,
    extraContent,
    extraButton
}