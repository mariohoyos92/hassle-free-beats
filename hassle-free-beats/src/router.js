import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Success from "./components/Success/Success";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/success" component={Success} />
  </Switch>
);
