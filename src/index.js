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
      ranking: []
    };
    this.updateRanking = this.updateRanking.bind(this);
    this.updatePuzzle = this.updatePuzzle.bind(this);
  }
  updateRanking(playerData) {
    if (!playerData) return;
    let rankList = this.state.ranking.slice(0);
    rankList.push(playerData);
    this.setState({ranking: rankList});
  }
  updatePuzzle(puzzle) {
    this.setState({puzzle: puzzle});
  }
  render() {
    return (
      <main>
        <BrowserRouter>
          <div>
            <div className="tab">
              <Link to="/">game</Link>
              <Link to="/rank">Rank</Link>
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
                render={props => (
                  <Rank
                    ranking={this.state.ranking}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
