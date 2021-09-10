import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

export default function CheckboxComponent(props){

  const items = [];

  Object.keys(props.items).forEach((key, idx) => {
    const item = props.items[key];
    const label = item.label || "no label"
    const value = item.value;
    const checked = props.value.includes(value);

    const onChange = (e) => {
      if(e.target.checked){
        const arr = props.value.map(x => x);
        arr.push(value);
        arr.sort();
        props.onChange({
          ...e,
          target: {
            value: arr
          }
        });
      }else{
        const arr = props.value.filter(x => x != value);
        arr.sort();
        props.onChange({
          ...e,
          target: {
            value: arr
          }
        })
      }
    }

    items.push(
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={onChange} disabled={props.disabled}/>
      }
      label={label}
      key={idx}
    />)
  })

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        {items}
      </FormGroup>
    </FormControl>
  )

}