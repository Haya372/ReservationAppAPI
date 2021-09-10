import React from "react";
import ReactDOM from "react-dom";
import Alert from '@material-ui/lab/Alert';

export default function SuccessAlert(props){
  return ReactDOM.createPortal((
    <div className="fixed z-10 bottom-10 left-1/2 -translate-x-2/4">
      <Alert severity="success">{props.message}</Alert>
    </div>
  ), document.getElementById('modal'))
}