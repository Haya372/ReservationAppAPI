import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Search from "../components/search.jsx";
import Divider from "@material-ui/core/Divider";
import DetailsLayout from "../components/detailsLayout.jsx";

export default function OrganizationSpace(props){
  const { organization_id } = useParams();
  const [search, setSearch] = useState("");
  const [spaces, setSpaces] = useState([]);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/organization/${organization_id}/space`, { 
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

  const conf = {
    name: {
      size: 12,
      required: true,
      component: 'text',
      props: {
        fullWidth: true,
        notNull: true,
        label: "name"
      }
    },
  }

  return (
    <Layout header="organization">
      <DetailsLayout
        apiPath={`/api/organization/${organization_id}`}
        disabled={false}
        conf={conf}
      />
      <div className="my-4">
        <Divider />
      </div>
      <div>
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
          items={spaces}
          primary="name"
          secondary={secondary}
          path=""
          id="id"
        />
      </div>
    </Layout>
  )
}