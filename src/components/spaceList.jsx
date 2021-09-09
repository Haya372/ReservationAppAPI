import React, { useState, useEffect } from "react";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Search from "../components/search.jsx";
import { useHistory } from "react-router";

export default function SpaceList(props){
  const [search, setSearch] = useState("");
  const [spaces, setSpaces] = useState([]);
  const history = useHistory();

  const onClickCreate = () => {
    history.push(`/organization/${props.organizationId}/space/new`)
  }

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/organization/${props.organizationId}/space`, { 
        params: {
          search: search
        }
      });
      setSpaces(res.data);
    } catch (err) {
      alert(err);
    }
  }, [search]);
  
  const secondary = {
    capacity: {
      text: "capacity"
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <div className="flex items-center my-2">
        <Search
          className="flex-grow"
          onChange={onChangeSearch}
          value={search}
        />
        <div className="text-blue-400">
          <Button endIcon={<AddIcon />} color="inherit" variant="outlined" onClick={onClickCreate}>
            新規作成
          </Button>
        </div>
      </div>
      <List
        items={spaces}
        primary="name"
        secondary={secondary}
        path="space"
        id="id"
      />
    </div>
  )
}