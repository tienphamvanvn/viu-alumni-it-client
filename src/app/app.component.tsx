import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./modules/home";
import "./styles/app.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
