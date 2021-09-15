import React, { useState, useEffect } from "react";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Search from "../components/search.jsx";
import { useHistory } from "react-router";
import Pagination from '@material-ui/lab/Pagination';

export default function SpaceList(props){
  const [search, setSearch] = useState("");
  const [spaces, setSpaces] = useState([]);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const onClickCreate = () => {
    history.push(`/organization/${props.organizationId}/space/new`)
  }

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/admin/organization/${props.organizationId}/space`, { 
        params: {
          search: search,
          page: page
        }
      });
      setSpaces(res.data.items);
      setTotal(Math.ceil(res.data.total / 25));
    } catch (err) {
      alert(err);
    }
  }, [search, page]);
  
  const secondary = {
    capacity: {
      text: "capacity"
    }
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const onChangePage = (e, newPage) => {
    if(page == newPage){
      return;
    }
    setPage(newPage);
  }

  return (
    <div>
      <div className="flex items-center my-4">
        <Search
          className="flex-grow"
          onChange={onChangeSearch}
          value={search}
        />
        <div className="text-blue-400">
          <Button endIcon={<AddIcon />} color="inherit" variant="outlined" onClick={onClickCreate} disabled={props.creatable}>
            新規作成
          </Button>
        </div>
      </div>
      <List
        items={spaces}
        primary="name"
        secondary={secondary}
        path="/space"
        id="id"
      />
      <div className="my-4 text-center">
        <Pagination
          count={total}
          onChange={onChangePage}
          defaultPage={1}
          color="primary"
        />
      </div>
    </div>
  )
}