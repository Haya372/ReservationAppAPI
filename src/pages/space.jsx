import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import ReservationList from "../components/reservationList.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabItems from "../components/tabItems.jsx";
import conf from '../configs/space.js';
import axios from '../utils/axios.js';

const tabs = ["details", "reservations"];

export default function Space(props){
  const { organization_id, space_id } = useParams();
  const [deletable, setDeletabel] = useState(false);
  const [updatable, setUpdatable] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const onTabChange = (e, newValue) => {
    history.push({
      pathname: location.pathname,
      hash: `#${tabs[newValue]}`
    });
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

  const tabValue = () => {
    const hash = location.hash.slice(1);
    const tabIdx = tabs.indexOf(hash);
    return tabIdx >= 0 ? tabIdx : 0;
  }

  return (
    <Layout header="Space">
      <Tabs
        value={tabValue()}
        indicatorColor="primary"
        textColor="primary"
        onChange={onTabChange}
      >
        <Tab label="Details" />
        <Tab label="Reservations"/>
      </Tabs>
      <TabItems
        value={tabValue()}
        items={[
          <DetailsLayout
            apiPath={`/api/admin/organization/${organization_id}/space/${space_id}`}
            disabled={!updatable}
            conf={conf}
            delete={deletable}
            root={`/organization/${organization_id}`}
            hash="#spaces"
          />,
          <ReservationList organizationId={organization_id} spaceId={space_id} />
        ]}
      />
    </Layout>
  )
}