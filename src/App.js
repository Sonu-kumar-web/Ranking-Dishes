import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Login from "./Login";
import Tabs from "./Tabs";
import Result from "./Result";

class App extends React.Component {
  state = { login: false };

  login = (val) => {
    this.setState({ login: val });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}>
            <div style={{ backgroundColor: "whitesmoke" }}>
              {this.state.login === false ? (
                <Login login={this.login} />
              ) : (
                <Tabs />
              )}
            </div>
          </Route>
          <Route exact path="/result" component={Result} />
        </Switch>
      </Router>
    );
  }
}

export default App;
