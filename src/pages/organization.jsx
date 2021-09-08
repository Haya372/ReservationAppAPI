import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Layout from "../components/layout.jsx";
import axios from '../utils/axios.js';
import OrganizationDetail from "../components/organizationDetail.jsx";

export default function Organization(props){
  const { id } = useParams();
  
  return (
    <Layout header="organization">
      <OrganizationDetail
        id={id}
        editable
      />
    </Layout>
  )
}