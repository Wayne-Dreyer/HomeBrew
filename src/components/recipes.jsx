import React, { Component } from "react";
import NavBar from "./navbar";

class Recipes extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar current="Recipes" />
        <h1>Recipes</h1>
      </React.Fragment>
    );
  }
}

export default Recipes;