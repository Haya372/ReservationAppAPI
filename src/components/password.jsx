import React, { useState } from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default function Password(props){
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    props.onChange(e);
  }

  const handleClickShowPassword = () => {
    const newVal = !show;
    setShow(newVal);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={`id-${props.label}`}>{props.label}</InputLabel>
      <Input
        id={`id-${props.label}`}
        value={props.value}
        onChange={onChange}
        fullWidth={props.fullWidth}
        variant={props.variant}
        type={show ? "text" : "password"}
        disabled={props.disabled}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}