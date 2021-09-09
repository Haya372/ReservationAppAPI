import React, { useState, useEffect } from "react";
import List from '../components/list.jsx';
import axios from "../utils/axios.js";
import Search from "../components/search.jsx";

export default function ReservationList(props){
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/organization/${props.organiztionId}/space/${props.spaceId}/reservation`, { 
        params: {
          search: search
        }
      });
      setReservations(res.data);
    } catch (err) {
      alert(err);
    }
  }, [search]);

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
    </div>
  )
}