import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import SpaceList from "../components/spaceList.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabItems from "../components/tabItems.jsx";
import UserList from "../components/userList.jsx";
import conf from '../configs/organization.js';
import axios from '../utils/axios.js';

export default function Organization(props){
  const { organization_id } = useParams();
  const [tab, setTab] = useState(0);
  const [deletable, setDeletabel] = useState(false);
  const [updatable, setUpdatable] = useState(false);
  const [creatable, setCreatable] = useState(false);

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
          case 'create':
            setCreatable(true);
            break;
        }
      });
    } catch(err) {
      alert(err);
    }
  }, []);

  return (
    <Layout header="Organization">
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={onTabChange}
      >
        <Tab label="Details" />
        <Tab label="Spaces"/>
        <Tab label="Users"/>
      </Tabs>
      <TabItems
        value={tab}
        items={[
          <DetailsLayout
            apiPath={`/api/admin/organization/${organization_id}`}
            disabled={!updatable}
            conf={conf}
            delete={deletable}
            root='/'
          />,
          <SpaceList organizationId={organization_id} create={creatable}/>,
          <UserList organizationId={organization_id} />,
        ]}
      />
    </Layout>
  )
}