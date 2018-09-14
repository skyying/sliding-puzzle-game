import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      puzzle: [1, 2, 3, 4, 5, 6, 7, 8, 0],
      step: 0,
      lastMove: ""
    };
    this.handleName = this.handleName.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.checkPossibleMove = this.checkPossibleMove.bind(this);
  }
  handleName(e) {
    this.setState({ name: e.currentTarget.value });
  }
  movePiece(target) {
    let emptyIndex = this.state.puzzle.findIndex(val => val === 0);
    console.log("emptyIndex", emptyIndex);
    console.log("current", target);
    console.log(emptyIndex-target);

    let moved = this.state.puzzle.slice(0);
    this.setState({puzzle:[]})

  }
  checkPossibleMove(){
  }
  shuffle() {}
  render() {
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
