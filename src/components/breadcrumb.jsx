import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import axios from "../utils/axios.js";

export default function Breadcrumb(props){
  const { organization_id, space_id, reservation_id } = useParams();
  const [organization, setOrganization] = useState({});
  const [space, setSpace] = useState({});
  const history = useHistory();

  useEffect(async () => {
    try {
      if(organization_id){
        const res = await axios.get(`/api/admin/organization/${organization_id}`);
        setOrganization({ id: res.data.id, name: res.data.name });
      }
      if(space_id){
        const res = await axios.get(`/api/admin/organization/${organization_id}/space/${space_id}`);
        setSpace({ id: res.data.id, name: res.data.name});
      }
    } catch (err) {
      alert(err);
    }
  }, []);

  const createElement = (obj, basePath) => {
    if(!obj.id || !obj.name){
      return null;
    }
    const onClick = () => {
      history.push({
        pathname: `${basePath}/${obj.id}`,
        hash: "#details"
      });
    }

    return (
      <div className="flex">
        <div className="font-normal text-gray-400">/</div>
        <div className="mx-2 hover:text-blue-500 hover:underline" onClick={onClick}>
          {obj.name}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-6 my-5 flex font-medium text-xl text-gray-500">
      <div className="mx-2 hover:text-blue-500 hover:underline" onClick={() => history.push('/')}>
        Home
      </div>
      {createElement(organization, '/organization')}
      {createElement(space, `/organization/${organization_id}/space`)}
      {createElement({ id: reservation_id, name: reservation_id }, `/organization/${organization_id}/space/${reservation_id}`)}
    </div>
  )
}