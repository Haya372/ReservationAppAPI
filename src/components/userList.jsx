import React, { useState, useEffect } from "react";
import axios from "../utils/axios.js";
import Search from "../components/search.jsx";
import Pagination from '@material-ui/lab/Pagination';
import Table from '../components/table.jsx';
import conf from '../configs/table/user.js';

export default function UserList(props){
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/admin/organization/${props.organizationId}/user`, { 
        params: {
          search: search,
          page: page
        }
      });
      setUsers(res.data.items);
      setTotal(Math.ceil(res.data.total / 25));
    } catch (err) {
      alert(err);
    }
  }, [search, page]);

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
      </div>
      <Table
        items={users}
        conf={conf}
        link={`/organization/${props.organizationId}/user`}
        id="user_id"
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