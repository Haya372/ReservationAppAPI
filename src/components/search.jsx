import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

export default function Search(props){
  const classes = "flex border rounded-lg mx-4 p-1 " + props.className;
  return (
    <div className={classes}>
      <div className="pr-2">
        <SearchIcon />
      </div>
      <div className="flex-grow">
        <InputBase
          placeholder="Search..."
          value={props.value}
          onChange={(e) => props.onChange(e)}
        />
      </div>
    </div>
  )
}