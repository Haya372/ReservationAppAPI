import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './pages/login.jsx';
import Home from "./pages/home.jsx";
import './styles.css';

const CustomRoute = (props) => {
  if(localStorage.getItem('token')){
    return <Route path={props.path} exact={props.exact}>{props.children}</Route>
  }
  return <Redirect to="/login" />
}

const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <CustomRoute path="/" exact>
            <Home />
          </CustomRoute>
        </Switch>
      </Router>
    </div>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 