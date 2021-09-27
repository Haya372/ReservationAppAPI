import React, { useState, useEffect } from "react";
import axios from "../utils/axios.js";
import Search from "../components/search.jsx";
import Pagination from '@material-ui/lab/Pagination';
import Table from '../components/table.jsx';
import conf from '../configs/table/user.js';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddUser from "./addUser.jsx";

export default function UserList(props){
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [modal, setModal] = useState(false);

  const onClickCreate = () => {
    setModal(true);
  }

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
        <div className="text-blue-400">
          <Button endIcon={<AddIcon />} color="inherit" variant="outlined" onClick={onClickCreate} disabled={!props.create}>
            ユーザー追加
          </Button>
        </div>
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
      {modal ?
        <AddUser
          setShow={setModal}
          organizationId={props.organizationId}
          refresh={() => location.reload()}
        /> 
      : null}
    </div>
  )
}