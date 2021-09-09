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

export default function SpaceReservation(props){
  const { organization_id, space_id } = useParams();
  const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(async () => {
    try{
      const res = await axios.get(`/api/organization/${organization_id}/space/${space_id}/reservation`, { 
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
    capacity: {
      size: 12,
      required: true,
      component: 'number',
      props: {
        min: '0'
      }
    }
  }

  return (
    <Layout header="Space">
      <DetailsLayout
        apiPath={`/api/organization/${organization_id}/space/${space_id}`}
        disabled={false}
        conf={conf}
      />
      <div className="my-4">
        <Divider />
      </div>
      <div>
        <div className="flex items-center my-2">
          <div className="text-2xl font-bold">予約一覧</div>
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
          items={reservations}
          primary="space_name"
          secondary={secondary}
          path=""
          id="id"
        />
      </div>
    </Layout>
  )

}