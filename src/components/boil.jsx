import React, { Component } from "react";
import NavBar from "./navbar";

//import "./boil.css"

class Boil extends Component {
  state = {
    timeM : 60,
    timeS: "00"
  };
  render() {
    return (
      <React.Fragment>
        <NavBar current="Boil" />
        <h1>Boil</h1>
        
      </React.Fragment>
    );
  }
}

export default Boil;