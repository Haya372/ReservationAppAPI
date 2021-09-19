import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const datetimeParser = (d) => {
  if(typeof d == 'string') return d;
  const yyyy = d.getFullYear().toString();
  const MM = (d.getMonth() + 1).toString();
  const dd = d.getDate().toString();
  const hh = d.getHours().toString();
  const mm = d.getMinutes().toString();
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
}

export default function Datetime(props){
  const onChange = (e) => {
    props.onChange({
      target: {
        value: datetimeParser(e)
      }
    });
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="dialig"
        value={props.value}
        onChange={onChange}
        ampm={false}
        format="yyyy/MM/dd HH:mm"
        label={props.label}
        fullWidth
        disabled={props.disabled}
      />
    </MuiPickersUtilsProvider>
  );
}