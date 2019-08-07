import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import './styles/app.scss';
import Login from 'Pages/login';
import Register from 'Pages/register';
import HomePage from 'Pages/home';
import Calender from 'Pages/calender';
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/calender" component={Calender} />
      </Switch>
    )
  }
}