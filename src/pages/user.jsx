import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import conf from '../configs/user.js';

export default function User(props){
  const { organization_id, user_id } = useParams();
  const [deletable, setDeletabel] = useState(true);

  return (
    <Layout header="User">
      <DetailsLayout
        apiPath={`/api/admin/organization/${organization_id}/user/${user_id}`}
        disabled={false}
        conf={conf}
        delete={deletable}
        root={`/organization/${organization_id}`}
      />
    </Layout>
  )
}