import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

export default function Flg(props){

  const onChange = (e) => {
    props.onChange({
      target: {
        value: e.target.checked
      }
    });
  }

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
      <FormControlLabel
        control={
          <Checkbox checked={props.value} onChange={onChange} disabled={props.disabled}/>
        }
        label={props.label}
      /> 
      </FormGroup>
    </FormControl>
  )

}