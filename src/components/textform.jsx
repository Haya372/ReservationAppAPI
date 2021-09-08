import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

export default function TextForm(props){
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onChange = (e) => {
    if(props.notNull){
      setErr(e.target.value.length == 0);
      if(e.target.value.length == 0){
        setErrMsg(`${props.label}は入力必須です`);
      }
    }
    props.onChange(e);
  }

  return (
    <div>
      <TextField
        label={props.label}
        value={props.value}
        onChange={onChange}
        fullWidth={props.fullWidth}
        variant={props.variant}
        type={props.type}
        error={err}
        disabled={props.disabled}
      />
      { err ?
        <Alert severity="error">{errMsg}</Alert>
        : null
      }
    </div>
  )
}