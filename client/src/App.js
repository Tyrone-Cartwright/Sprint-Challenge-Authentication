import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import "./App.css";

import Signin from "./components/Signin/signin";
import Signup from "./components/Signup/signup";
import Jokes from "./components/Jokes/jokes";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/api/signin">Signin</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/api/jokes">Jokes</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/api/signup">Signup</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.signout}>Signout</button>
          </nav>
        </header>
        <main>
          <Route path="/api/signin" component={Signin} />
          <Route path="/api/jokes" component={Jokes} />
          <Route path="/api/signup" component={Signup} />
        </main>
      </>
    );
  }

  signout = () => {
    localStorage.removeItem("jwt");
    window.location.replace("/signin");
  };
}

export default App;
