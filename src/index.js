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
    this.state = {ranking: []};
    this.updateRanking = this.updateRanking.bind(this);
  }
  updateRanking(playerData) {
    if(!playerData) return;
    console.log("in updateRanking");
    console.log("playerData", playerData);
    let rankList = this.state.ranking.slice(0);
    rankList.push(playerData);
    console.log(rankList);
    console.log("rankList", rankList);
    this.setState({ranking: rankList});
  }
  render() {
    console.log("----------this.state.ranking");
    console.log(this.state.ranking);
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
