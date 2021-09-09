import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import Divider from "@material-ui/core/Divider";
import DetailsLayout from "../components/detailsLayout.jsx";
import ReservationList from "../components/reservationList.jsx";

export default function Space(props){
  const { organization_id, space_id } = useParams();

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