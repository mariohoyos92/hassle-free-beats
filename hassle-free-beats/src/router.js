import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Success from "./components/Success/Success";
import CheckoutView from "./components/CheckoutView/CheckoutView";
import About from "./components/About/About";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/success" component={Success} />
    <Route path="/checkout" component={CheckoutView} />
    <Route path="/about" component={About} />
    <Route path="/faq" component={FAQ} />
    <Route path="/contact" component={Contact} />
  </Switch>
);
