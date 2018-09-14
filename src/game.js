import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "leslie",
      puzzle: [1, 2, 3, 4, 5, 6, 7, 0, 8],
      step: 0,
      isGameOver: false
    };
    props.updateScore();
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

    if (this.validSolution(moved)) {
      this.setState({isGameOver: true});
      let player = {};
      // playerData[this.state.name] = this.state.step;
      player.name = this.state.name;
      player.step = this.state.step;
      this.props.updateScore(player);
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
  render() {
    console.log("------------");
    console.log(this.state);
    let puzzle = this.state.puzzle.map((num, index) => (
      <div key={index} onClick={() => this.movePiece(index)}>
        <span> {num !== 0 ? num : ""}</span>
      </div>
    ));
    return (
      <div>
        <input value={this.state.name} onChange={this.handleName} />
        <button disabled={!this.state.name.length}>start</button>
        <div>step count:{this.state.step}</div>
        <div>{this.state.isGameOver ? "你贏惹" : ""}</div>
        <div className="puzzle"> {puzzle}</div>
        <button onClick={this.shuffle}>洗牌</button>
      </div>
    );
  }
}

export class Rank extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.ranking);
  }
  render() {
    console.log("-----------------xxxxxxxxxxx----");
    console.log(this.props.ranking);
    let rankList = this.props.ranking.map((player, index) => {
      return (
        <div key={index}>
          {player.name} : {player.step}
        </div>
      );
    });
    if (!this.props.ranking.length) {
      return <div>no player data</div>;
    }
    return <div>{rankList}</div>;
  }
}
