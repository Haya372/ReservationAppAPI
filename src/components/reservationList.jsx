import React, { useState, useEffect } from "react";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Search from "../components/search.jsx";
import Pagination from '@material-ui/lab/Pagination';

export default function ReservationList(props){
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/admin/organization/${props.organiztionId}/space/${props.spaceId}/reservation`, { 
        params: {
          search: search,
          page: page
        }
      });
      setReservations(res.data.items);
      setTotal(Math.ceil(res.data.total / 25));
    } catch (err) {
      alert(err);
    }
  }, [search, page]);

  const secondary = {
    numbers: {
      text: "予約",
      suffix: "人,"
    },
    start_time: {
      text: "start",
      suffix: ","
    },
    end_time: {
      text: "end",
      suffix: ","
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
      </div>
      <List
        items={reservations}
        primary="space_name"
        secondary={secondary}
        path="/reservation"
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