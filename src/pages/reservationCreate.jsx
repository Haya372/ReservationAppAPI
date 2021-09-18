import React from "react";
import Layout from "../components/layout.jsx";
import CreateLayout from '../components/createLayout.jsx';
import { useParams } from "react-router";
import conf from '../configs/create/reservation.js';

export default function ReservationCreate(props) {
  const { organization_id, space_id } = useParams();

  return (
    <Layout header="Reservation">
      <CreateLayout
        apiPath={`/api/admin/organization/${organization_id}/space/${space_id}/reservation`}
        resourceName="reservation"
        conf={conf}
        organizationId={organization_id}
        spaceId={space_id}
      />
    </Layout>
  )
}