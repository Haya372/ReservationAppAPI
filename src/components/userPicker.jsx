import axios from "../utils/axios.js";
import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";

export default function UserPicker(props){
  const [user, setUser] = useState({ name: "" });
  const [flg, setFlg] = useState(true);

  useEffect(async () => {
    let isMounted = true;
    if(!props.value){
      if(isMounted) {
        setTimeout(() => { setFlg(!flg) }, 100);
      }
      return;
    }
    try {
      const res = await axios.get(`/api/user/${props.value}`);
      setUser(res.data);
    } catch(err) {
      if(err.response?.status == 404){
        setUser({ name: "undifined" });
      }
      alert(err);
    }
    return () => { isMounted = false };
  }, [flg]);

  const style = {};

  if(props.color){
    style.backgroundColor = props.color;
  }

  return (
    <Chip
      label={user?.name || "undifined"}
      style={style}
    />
  )
}