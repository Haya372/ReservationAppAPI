import React, { useState } from 'react';
import { SketchPicker, BlockPicker } from 'react-color';

export default function ColorPicker(props){
  const color = props.value || "#ccc";

  const onChangeColor = (color) => {
    console.log(color)
    props.onChange({
      target: {
        value: color.hex
      }
    });
  }

  const styles = {
    color: props.disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherrit'
  }

  return (
    <div>
      <div style={styles} className="my-2">{props.label}</div>
      { props.disabled ?
        <div className="h-20 w-20" style={{ backgroundColor : color }} />
      : <BlockPicker
        color={color}
        onChangeComplete={onChangeColor}
        disabled={props.disabled}
      />
      }
    </div>
  );
}