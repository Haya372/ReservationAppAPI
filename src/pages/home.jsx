import React, { useState, useEffect } from "react";
import Layout from '../components/layout.jsx';
import List from "../components/list.jsx";
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Search from "../components/search.jsx";
import { useHistory } from "react-router";
import Pagination from '@material-ui/lab/Pagination';

export default function Home(props){
  const [organizations, setOrganizations] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(async () => {
    try{
      const res = await axios.get('/api/admin/organization', { 
        params: {
          search: search,
          page: page
        }
      });
      setOrganizations(res.data.items);
      setTotal(Math.ceil(res.data.total / 25));
    } catch (err) {
      alert(err);
    }
  }, [search, page]);

  const secondary = {
    role: {
      text: "role"
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const onClickCreate = () => {
    history.push('/organization/new')
  }

  const onChangePage = (e, newPage) => {
    if(page == newPage){
      return;
    }
    setPage(newPage);
  }

  return (
    <Layout header="Home">
      <div className="flex items-center my-4">
        <div className="text-2xl font-bold">所属団体一覧</div>
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
        items={organizations}
        primary="organization_name"
        secondary={secondary}
        path="organization"
        id="organization_id"
      />
      <div className="my-4 text-center">
        <Pagination
          count={total}
          onChange={onChangePage}
          defaultPage={1}
          color="primary"
        />
      </div>
    </Layout>
  )
}