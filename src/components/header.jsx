import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function Header(props){

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="flex-grow">
          {props.header}
        </div>
      </Toolbar>
    </AppBar>
  )
}