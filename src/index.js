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
import { Rank } from "./game.js";
class App extends React.Component {
  constructor(props) {
    super(props);
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
              <Route path="/" render={() => <Game />} exact />
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
