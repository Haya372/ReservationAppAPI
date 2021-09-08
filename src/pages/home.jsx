import React, { useState, useEffect } from "react";
import Layout from '../components/layout.jsx';
import List from "../components/list.jsx";
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Search from "../components/search.jsx";

export default function Home(props){
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(async () => {
    try{
      const res = await axios.get('/api/admin/organization', { 
        params: {
          search: search
        }
      });
      setOrganizations(res.data);
    } catch (err) {
      alert(err);
    }
  }, [search]);

  const secondary = {
    role: {
      text: "role"
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <Layout header="Home">
      <div className="flex items-center my-2">
        <div className="text-2xl font-bold">所属団体一覧</div>
        <Search
          className="flex-grow"
          onChange={onChangeSearch}
          value={search}
        />
        <div className="text-blue-400">
          <Button endIcon={<AddIcon />} color="inherit" variant="outlined">
            新規作成
          </Button>
        </div>
      </div>
      <List
        items={organizations}
        primary="organization_name"
        secondary={secondary}
      />
    </Layout>
  )
}