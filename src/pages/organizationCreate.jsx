import React from "react";
import Layout from "../components/layout.jsx";
import CreateLayout from '../components/createLayout.jsx';
import conf from '../configs/organization.js';
import { useEffect } from "react";

export default function OrganizationCreate(props){
  conf["password"] = {
    size: 12,
    required: true,
    component: 'password',
    props: {
      fullWidth: true,
      notNull: true,
      label: "パスワード",
      type: "password",
    }
  }

  useEffect(() => {
    return () => {
      delete conf["password"]
    }
  }, []);

  return (
    <Layout header="Organization">
      <CreateLayout
        apiPath={`/api/admin/organization/`}
        resourceName="organization"
        conf={conf}
      />
    </Layout>
  )
}