import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import './styles/app.scss';
import Login from '././pages/login';
import Register from './pages/register';
import HomePage from './pages/home';
import Calender from './pages/calender';
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