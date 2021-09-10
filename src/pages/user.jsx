import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import conf from '../configs/user.js';
import axios from '../utils/axios.js';

export default function User(props){
  const { organization_id, user_id } = useParams();
  const [deletable, setDeletabel] = useState(false);
  const [updatable, setUpdatable] = useState(false);

  useEffect(async () => {
    try {
      const res = await axios.get(`/api/admin/organization/${organization_id}/role`);
      res.data.forEach((role) => {
        switch(role){
          case 'update':
            setUpdatable(true);
            break;
          case 'delete':
            setDeletabel(true);
            break;
        }
      });
    } catch(err) {
      alert(err);
    }
  }, []);

  return (
    <Layout header="User">
      <DetailsLayout
        apiPath={`/api/admin/organization/${organization_id}/user/${user_id}`}
        disabled={!updatable}
        conf={conf}
        delete={deletable}
        root={`/organization/${organization_id}`}
      />
    </Layout>
  )
}