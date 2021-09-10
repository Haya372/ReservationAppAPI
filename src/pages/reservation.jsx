import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import DetailsLayout from "../components/detailsLayout.jsx";
import conf from '../configs/reservation.js';

export default function Reservation(props){
  const { organization_id, space_id, reservation_id } = useParams();
  const [deletable, setDeletabel] = useState(true);

  return (
    <Layout header="Reservation">
      <DetailsLayout
        apiPath={`/api/admin/organization/${organization_id}/space/${space_id}/reservation/${reservation_id}`}
        disabled={true}
        conf={conf}
        delete={deletable}
        root={`/organization/${organization_id}/${space_id}`}
      />
    </Layout>
  )
}