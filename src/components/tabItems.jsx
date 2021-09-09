import React from "react";

export default function TabItems(props){
  return (
    <div>
      {props.items[props.value]}
    </div>
  )
}