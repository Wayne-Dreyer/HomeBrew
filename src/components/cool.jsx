import React, { Component } from "react";
import NavBar from "./navbar";
import TempSlider from "./TempSlider";
//import "./cool.css";

class Cool extends Component {
  state = {
    timeM: '00', //values to be changed to show countdown when backend connected
    timeS: '00' 
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1>Cool</h1>
        
      </React.Fragment>
    );
  }
}

export default Cool;