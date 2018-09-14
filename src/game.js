import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      puzzle: [1, 2, 3, 4, 5, 6, 7, 0, 8],
      step: 0
    };
    this.handleName = this.handleName.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.validSolution = this.validSolution.bind(this);
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
    return (
      (Math.abs(targetIndex - emptyIndex) === boardRowNum &&
                targetIndex % boardRowNum === emptyIndex % boardRowNum) ||
            (Math.abs(targetIndex - emptyIndex) === 1 &&
                Math.floor(targetIndex / boardRowNum) ===
                    Math.floor(emptyIndex / boardRowNum))
    );
  }
  shuffle() {}
  validSolution() {
    return (
      this.state.puzzle
        .slice(0, 8)
        .filter((piece, index) => +piece !== index + 1).length === 0
    );
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
