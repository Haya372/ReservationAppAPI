import React, { useState, useEffect } from "react";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Search from "../components/search.jsx";

export default function UserList(props){
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/admin/organization/${props.organizationId}/user`, { 
        params: {
          search: search
        }
      });
      setUsers(res.data);
    } catch (err) {
      alert(err);
    }
  }, [search]);
  
  const secondary = {
    user_email: {
      text: "email"
    },
    role: {
      text: "role"
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <div className="flex items-center my-4">
        <Search
          className="flex-grow"
          onChange={onChangeSearch}
          value={search}
        />
      </div>
      <List
        items={users}
        primary="user_name"
        secondary={secondary}
        path="/user"
        id="user_id"
      />
    </div>
  )
}