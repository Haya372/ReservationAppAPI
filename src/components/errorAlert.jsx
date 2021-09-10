import React from "react";
import ReactDOM from "react-dom";
import Alert from '@material-ui/lab/Alert';

export default function ErrorAlert(props){
  return ReactDOM.createPortal((
    <div className="fixed z-10 bottom-10 left-1/2 -translate-x-2/4">
      <Alert severity="error">{props.message}</Alert>
    </div>
  ), document.getElementById('modal'))
}