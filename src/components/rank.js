import React from "react";
import {Link} from "react-router-dom";

export default class Rank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rankData = JSON.parse(localStorage.getItem("rank")) || [];
    let rankList = rankData.map((player, index) => {
      return (
        <div className="player-row" key={index}>
          <div>{index + 1}</div>
          <div>{player.name}</div>
          <div>{player.step}</div>
        </div>
      );
    });
    if (!rankData.length) {
      return <div>還沒有人來玩也</div>;
    }
    return (
      <div>
        <div className="player-row">
          <div>Rank </div>
          <div>Name</div> <div>Step</div>
        </div>
        {rankList}
      </div>
    );
  }
}
