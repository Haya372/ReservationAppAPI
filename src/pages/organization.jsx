import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import SpaceList from "../components/spaceList.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabItems from "../components/tabItems.jsx";
import UserList from "../components/userList.jsx";
import conf from '../configs/organization.js';
import axios from '../utils/axios.js';

const tabs = ["details", "spaces", "users"];

export default function Organization(props){
  const { organization_id } = useParams();
  const [deletable, setDeletabel] = useState(false);
  const [updatable, setUpdatable] = useState(false);
  const [creatable, setCreatable] = useState(false);
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
          case 'create':
            setCreatable(true);
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
    <Layout header="Organization">
      <Tabs
        value={tabValue()}
        indicatorColor="primary"
        textColor="primary"
        onChange={onTabChange}
      >
        <Tab label="Details" />
        <Tab label="Spaces"/>
        <Tab label="Users"/>
      </Tabs>
      <TabItems
        value={tabValue()}
        items={[
          <DetailsLayout
            apiPath={`/api/admin/organization/${organization_id}`}
            disabled={!updatable}
            conf={conf}
            delete={deletable}
            root='/'
            password
          />,
          <SpaceList organizationId={organization_id} create={creatable}/>,
          <UserList organizationId={organization_id} create={creatable}/>,
        ]}
      />
    </Layout>
  )
}