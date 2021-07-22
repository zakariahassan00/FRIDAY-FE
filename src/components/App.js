import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import LandingPage from "./landing/Landing";
import SelectedCars from "./cars/SelectedCars";

function App() {

  return (
    <div className="App">
      <Header />

      <div className="header_fixed_position_clear"/>
      
      <Switch>
        <Route path="/cars/:make/:model" component={SelectedCars} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
