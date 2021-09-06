import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

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
    </div>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 