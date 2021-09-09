import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import Divider from "@material-ui/core/Divider";
import DetailsLayout from "../components/detailsLayout.jsx";
import ReservationList from "../components/reservationList.jsx";
import conf from '../configs/space.js';

export default function Space(props){
  const { organization_id, space_id } = useParams();

  return (
    <Layout header="Space">
      <DetailsLayout
        apiPath={`/api/organization/${organization_id}/space/${space_id}`}
        disabled={false}
        conf={conf}
      />
      <div className="my-4">
        <Divider />
      </div>
      <ReservationList organizationId={organization_id} spaceId={space_id} />
    </Layout>
  )
}