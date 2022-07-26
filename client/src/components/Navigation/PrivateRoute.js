import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import Landing from '../Landing'
import Reviews from '../Reviews'
import Search from '../Search'
import MoviePosters  from "../MoviePosters";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviews" exact component={Home} />
      <Route path="/moviePosters" exact component={MoviePosters} />

      </Switch>
    </Router>
  );
}