import React, { useState, useEffect } from "react";
import Layout from '../components/layout.jsx';
import List from "../components/list.jsx";
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function Home(props){
  const [organizations, setOrganizations] = useState([]);

  useEffect(async () => {
    try{
      const res = await axios.get('/api/admin/organization');
      setOrganizations(res.data);
    } catch (err) {
      alert(err);
    }
  }, []);

  const secondary = {
    role: {
      text: "role"
    }
  }

  return (
    <Layout header="Home">
      <div className="flex items-end">
        <div className="text-2xl font-bold my-2 flex-grow">所属団体一覧</div>
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