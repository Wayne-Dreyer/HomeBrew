import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
//import NavBar from "./components/navbar";
//import styled from 'styled-components';
import Home from "./components/home";
import Mash from "./components/mash";
import Boil from "./components/boil";
import Cool from "./components/cool";
import Settings from "./components/settings";
import Recipes from "./components/recipes";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/Boil" component={Boil} />
          <Route path="/Mash" component={Mash} />
          <Route path="/Cool" component={Cool} />
          <Route path="/Recipes" component={Recipes} />
          <Route path="/Settings" component={Settings} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;