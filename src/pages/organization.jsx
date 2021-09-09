import React, { useState } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import Divider from "@material-ui/core/Divider";
import DetailsLayout from "../components/detailsLayout.jsx";
import SpaceList from "../components/spaceList.jsx";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabItems from "../components/tabItems.jsx";
import UserList from "../components/userList.jsx";
import conf from '../configs/organization.js';

export default function Organization(props){
  const { organization_id } = useParams();
  const [tab, setTab] = useState(0);

  const onTabChange = (e, newValue) => {
    setTab(newValue);
  }

  return (
    <Layout header="Organization">
      <DetailsLayout
        apiPath={`/api/organization/${organization_id}`}
        disabled={false}
        conf={conf}
      />
      <div className="my-4">
        <Divider />
      </div>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={onTabChange}
      >
        <Tab label="Spaces"/>
        <Tab label="Users"/>
      </Tabs>
      <TabItems
        value={tab}
        items={[
          <SpaceList organizationId={organization_id} />,
          <UserList organizationId={organization_id} />,
        ]}
      />
    </Layout>
  )
}