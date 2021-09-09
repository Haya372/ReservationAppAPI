import React from "react";
import Layout from "../components/layout.jsx";
import CreateLayout from '../components/createLayout.jsx';

export default function OrganizationCreate(props){
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
    password: {
      size: 12,
      required: true,
      component: 'text',
      props: {
        fullWidth: true,
        notNull: true,
        label: "password",
        type: "password",
      }
    }
  }

  return (
    <Layout header="Organization">
      <CreateLayout
        apiPath={`/api/organization/`}
        resourceName="organization"
        conf={conf}
      />
    </Layout>
  )
}