import React from "react";
import {Link} from "react-router-dom";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      puzzle: [1, 2, 3, 4, 5, 6, 7, 0, 8],
      step: 0,
      isWin: false,
      isGameOn: false
    };
    this.handleName = this.handleName.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.validSolution = this.validSolution.bind(this);
    this.checkPossibleMove = this.checkPossibleMove.bind(this);
    this.swapPiece = this.swapPiece.bind(this);
    this.startGame = this.startGame.bind(this);
    this.goEasyMode = this.goEasyMode.bind(this);
  }
  handleName(e) {
    this.setState({playerName: e.currentTarget.value});
  }
  movePiece(targetIndex) {
    let emptyIndex = this.state.puzzle.findIndex(piece => piece === 0);

    if (targetIndex === emptyIndex) return;
    if (this.checkPossibleMove(targetIndex)) {
      this.swapPiece(targetIndex, emptyIndex);
    }
  }
  swapPiece(targetIndex, emptyIndex) {
    let moved = this.state.puzzle.slice(0);
    let targetPiece = moved[targetIndex];
    moved[emptyIndex] = targetPiece;
    moved[targetIndex] = 0;

    if (this.validSolution(moved)) {
      this.setState({isWin: true, isGameOn: false});
      let player = {};
      player.name = this.state.playerName;
      player.step = this.state.step + 1;
      this.props.updateRanking(player);
    }
    this.setState({puzzle: moved, step: this.state.step + 1});
  }

  checkPossibleMove(targetIndex) {
    let emptyIndex = this.state.puzzle.findIndex(piece => piece === 0);
    let boardRowNum = 3;

    // check if in same row, then check if in the same column;
    // piece in the same column should have same remaining, in the same row should have
    // same quotient
    return (
      (Math.abs(targetIndex - emptyIndex) === boardRowNum &&
                targetIndex % boardRowNum === emptyIndex % boardRowNum) ||
            (Math.abs(targetIndex - emptyIndex) === 1 &&
                Math.floor(targetIndex / boardRowNum) ===
                    Math.floor(emptyIndex / boardRowNum))
    );
  }
  shuffle() {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let swapTimes = Math.floor(Math.random() * 1000) * 2;
    let i = 0;
    let puzzleArr = Array.from({length: 9})
      .fill(0)
      .map((piece, index) => index);
    while (i < swapTimes) {
      // handle swap boundary;
      let randomIndex = getRandomInt(1, 8);
      let prev = puzzleArr[randomIndex - 1],
        current = puzzleArr[randomIndex];
      puzzleArr[randomIndex] = prev;
      puzzleArr[randomIndex - 1] = current;
      i++;
    }
    this.setState({puzzle: puzzleArr});
  }
  validSolution(puzzle) {
    return (
      puzzle.slice(0, 8).filter((piece, index) => +piece !== index + 1)
        .length === 0
    );
  }
  startGame(mode) {
    this.setState({isGameOn: true, isWin: false, step: 0});
    if (mode === "easy") {
      this.goEasyMode();
    } else {
      this.shuffle();
    }
  }
  goEasyMode() {
    this.setState({puzzle: [1, 2, 3, 4, 5, 6, 7, 0, 8]});
  }

  render() {
    let puzzle = this.state.puzzle.map((num, index) => (
      <div key={index} onClick={() => this.movePiece(index)}>
        <span> {num !== 0 ? num : ""} </span>
      </div>
    ));
    let disable = !this.state.playerName.length || this.state.isGameOn;
    return (
      <div>
        <input
          value={this.state.playerName}
          onChange={this.handleName}
          disabled={this.state.isGameOn}
          placeholder="You name"
        />
        <button
          disabled={disable}
          onClick={() => this.startGame("hard")}>
                    Start
        </button>
        <button
          disabled={disable}
          onClick={() => this.startGame("easy")}>
                    Easy
        </button>

        <div className="step">Step: {this.state.step}</div>
        <section className={this.state.isGameOn ? "game-on" : ""}>
          <div className="puzzle"> {puzzle}</div>
          <div className="overlay"> </div>

          <div className={this.state.isWin ? "ko" : "not-ko"}>
            <div className="ko-wrapper">
              <div className="large">KO</div>
              <div>去看看你的排名吧</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
