import "./style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Game from "./components/game.js";
import Rank from "./components/rank.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
      tab: window.location.pathname
    };
    this.updateRanking = this.updateRanking.bind(this);
  }
  updateRanking(playerData) {
    if (!playerData) return;

    let localStorage = window.localStorage,
      rankData = JSON.parse(localStorage.getItem("rank"));

    if (!rankData) {
      rankData = [playerData];
    } else {
      rankData.push(playerData);
    }

    localStorage.setItem("rank", JSON.stringify(rankData));
  }
  updateState(state) {
    this.setState(state);
  }

  render() {
    return (
      <main>
        <BrowserRouter>
          <div>
            <div className="tab">
              <Link
                onClick={() => this.setState({tab: "/"})}
                className={
                  this.state.tab === "/" ? "active" : ""
                }
                to="/">
                                Game
              </Link>
              <Link
                onClick={() => this.setState({tab: "/rank"})}
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
                  <Game updateRanking={this.updateRanking} />
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
