import React from 'react';
import TextField from '@material-ui/core/TextField';

const datetimeParser = (d) => {
  return d.substr(0, 19);
}

export default function Datetime(props){
  return (
    <TextField {...props} type="datetime-local" value={datetimeParser(props.value)}/>
  )
}