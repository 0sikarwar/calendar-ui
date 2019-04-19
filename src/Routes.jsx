import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import './styles/app.scss';
import Login from 'Pages/login';
import Register from 'Pages/register';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    )
  }
}