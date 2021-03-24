import React from "react";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Login from "./Login";
import Tabs from "./Tabs";

class App extends React.Component {
  state = { login: false };

  login = (val) => {
    this.setState({ login: val });
  };

  render() {
    return (
      <div style={{ backgroundColor: "whitesmoke" }}>
        {this.state.login === false ? <Login login={this.login} /> : <Tabs />}
      </div>
    );
  }
}

export default App;
