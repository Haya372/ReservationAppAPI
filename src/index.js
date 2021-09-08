import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/login.jsx';
import './styles.css';

const Index = () => {

  const onClick = () => {
    axios.get('/api/').then(res => {
      console.log(res);
      alert(res.data);
    });
  }
  
  return (
    <div>
      <h1>Hello React!</h1>
      <button onClick={onClick}>API test</button>
      <Router>
        <Route path='/login'>
          <Login />
        </Route>
      </Router>
    </div>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 