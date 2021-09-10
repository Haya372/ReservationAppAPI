import React from "react";
import UserPicker from "./userPicker.jsx";

export default function UserChips(props){
  const items = [];

  if(Array.isArray(props.value)){
    props.value.forEach((val, idx) => {
      items.push(<div className="mx-2">
        <UserPicker value={val} key={idx}/>
      </div>)
    });
  }else{
    items.push(<UserPicker value={props.value} key={0} />)
  }

  return (
    <div className="border-b border-gray-400 border-dotted">
      <div className="text-xs text-gray-400">{props.label}</div>
      <div className="flex" style={{ minHeight: '32px'}}>{items}</div>
    </div>
  )
}
