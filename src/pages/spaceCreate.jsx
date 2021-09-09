import React from "react";
import Layout from "../components/layout.jsx";
import CreateLayout from '../components/createLayout.jsx';
import { useParams } from "react-router";

export default function SpaceCreate(props){
  const { organization_id } = useParams();

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
        min: '0',
        label: 'capacity',
      }
    }
  }

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