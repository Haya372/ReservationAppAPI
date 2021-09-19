import React from 'react';
import Chip from '@material-ui/core/Chip';

export default function ArrayText(props){
  const join = props.join;
  return (<div>
    {props.value.join(join)}
  </div>)
}