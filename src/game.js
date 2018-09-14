import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      puzzle: [1, 2, 3, 4, 5, 6, 7, 0],
      step: 0,
      isGameOver: false
    };
    this.handleName = this.handleName.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.validSolution = this.validSolution.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.checkPossibleMove = this.checkPossibleMove.bind(this);
    this.swapPiece = this.swapPiece.bind(this);
  }
  handleName(e) {
    this.setState({name: e.currentTarget.value});
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
  validSolution() {
    let isGameOver =
            this.state.puzzle
              .slice(0, 8)
              .filter((piece, index) => +piece !== index + 1).length === 0;
    if (isGameOver) {
      this.setState({isGameOver: true});
    }
  }
  render() {
    let puzzle = this.state.puzzle.map((num, index) => (
      <div key={index} onClick={() => this.movePiece(index)}>
        <span> {num !== 0 ? num : ""}</span>
      </div>
    ));
    let solvedText = this.validSolution() ? "你贏了" : "";
    return (
      <div>
        <input value={this.state.name} onChange={this.handleName} />
        <button disabled={!this.state.name.length}>start</button>
        <div>step count:{this.state.step}</div>
        <div>{solvedText}</div>
        <div className="puzzle"> {puzzle}</div>
        <button onClick={this.shuffle}>洗牌</button>
      </div>
    );
  }
}

export class Rank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Ranking</div>;
  }
}

// let target;
// if(dir === "up"){

// } else if (dir === "down"){

// } else if(dir ==="left"){

// } else if(dir === "right"){

// }
