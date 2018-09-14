import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {
  IndexRoute,
  BrowserRouter,
  Router,
  Link,
  Route,
  Switch
} from "react-router-dom";

import Game from "./game.js";
import {Rank} from "./game.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
      tab: window.location.pathname
    };
    this.updateRanking = this.updateRanking.bind(this);
    this.updatePuzzle = this.updatePuzzle.bind(this);
  }
  updateRanking(playerData) {
    if (!playerData) return;
    let localStorage = window.localStorage;
    let localRankingData = JSON.parse(localStorage.getItem("rank"));
    let rankingList;
    if (!localRankingData) {
      localRankingData = [playerData];
    } else {
      localRankingData.push(playerData);
    }
    localStorage.setItem("rank", JSON.stringify(localRankingData));
  }
  setTab(tab) {
    this.setState({tab: tab});
  }
  updatePuzzle(puzzle) {
    this.setState({puzzle: puzzle});
  }
  render() {
    let currentTab = window.location.pathname;
    console.log(currentTab);

    return (
      <main>
        <BrowserRouter>
          <div>
            <div className="tab">
              <Link
                onClick={() => this.setTab("/")}
                className={
                  this.state.tab === "/" ? "active" : ""
                }
                to="/">
                                Game
              </Link>
              <Link
                onClick={() => this.setTab("/rank")}
                className={
                  this.state.tab === "/rank" ? "active" : ""
                }
                to="/rank">
                                Rank
              </Link>
            </div>
            <Switch>
              <Route
                path="/"
                render={() => (
                  <Game updateScore={this.updateRanking} />
                )}
                exact
              />
              <Route
                path="/rank"
                exact
                render={props => <Rank {...props} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
