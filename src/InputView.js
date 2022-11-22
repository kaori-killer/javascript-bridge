const Io = require("./Io");
const BridgeGame = require('./BridgeGame');
const Validation = require('./Validation');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');
const BridgeMaker = require('./BridgeMaker');
const OutputView = require('./OutputView');
let bridgeGame;
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */


const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {  
    Io.input('다리의 길이를 입력해주세요.', (userInput) => {
        Validation.validatePositiveInteger(userInput);
        Validation.validateNumberRange(userInput);
        const SIZE = Number(userInput);
        const BridgeStatus = BridgeMaker.makeBridge(SIZE, BridgeRandomNumberGenerator.generate);
        bridgeGame = new BridgeGame(SIZE, BridgeStatus);
        this.readMoving();
      });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(){
    Io.input('이동할 칸을 선택해주세요. (위: U, 아래: D)', (userInput) => {
      Validation.validateUserChoice(userInput);
      console.log(bridgeGame.BridgeStatus, userInput);
      const data = bridgeGame.move(userInput);
      if(data === "win") OutputView.printResult(bridgeGame.BridgeResultArray, bridgeGame.CompareResult, bridgeGame.count);
      if(data === "end") this.readGameCommand();
      this.readMoving();
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {
    Io.input('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)', (userInput) => {
      if(userInput === 'R'){
        bridgeGame.retry();
        this.readMoving();
      }
      if(userInput == 'Q'){
        console.log('Q');
        OutputView.printResult(bridgeGame.BridgeResultArray, bridgeGame.CompareResult, 10);
      }
    })
  },
};

module.exports = InputView;
