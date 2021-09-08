import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Header(props){
  const history = useHistory();
  const location = useLocation();

  const onClickBack = () => {
    history.goBack();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        { location.pathname === "/" || location.pathname === "/login" ?
          null
          : <IconButton edge="start" color="inherit" onClick={onClickBack}>
              <ArrowBackIosIcon />
            </IconButton>
        }
        <div className="flex-grow">
          {props.header}
        </div>
      </Toolbar>
    </AppBar>
  )
}