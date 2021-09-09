import React from "react";
import Layout from "../components/layout.jsx";
import CreateLayout from '../components/createLayout.jsx';
import { useParams } from "react-router";
import conf from '../configs/space.js';

export default function SpaceCreate(props){
  const { organization_id } = useParams();

  return (
    <Layout header="Space">
      <CreateLayout
        apiPath={`/api/organization/${organization_id}/space`}
        resourceName="space"
        conf={conf}
        organizationId={organization_id}
      />
    </Layout>
  )
}