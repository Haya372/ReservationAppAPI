import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import ReservationList from "../components/reservationList.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabItems from "../components/tabItems.jsx";
import conf from '../configs/space.js';
import axios from '../utils/axios.js';

export default function Space(props){
  const { organization_id, space_id } = useParams();
  const [deletable, setDeletabel] = useState(false);
  const [updatable, setUpdatable] = useState(false);
  const [tab, setTab] = useState(0);

  const onTabChange = (e, newValue) => {
    setTab(newValue);
  }

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
    <Layout header="Space">
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={onTabChange}
      >
        <Tab label="Details" />
        <Tab label="Reservations"/>
      </Tabs>
      <TabItems
        value={tab}
        items={[
          <DetailsLayout
            apiPath={`/api/admin/organization/${organization_id}/space/${space_id}`}
            disabled={!updatable}
            conf={conf}
            delete={deletable}
            root={`/organization/${organization_id}`}
          />,
          <ReservationList organizationId={organization_id} spaceId={space_id} />
        ]}
      />
    </Layout>
  )
}