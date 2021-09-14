import React from 'react';
import Header from './header.jsx';
import { useHistory } from 'react-router';
import Breadcrumb from './breadcrumb.jsx'


export default function Layout(props){
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Header header={props.header} />
      <Breadcrumb />
      <div className="mx-6 flex-grow">
        {props.children}
      </div>
    </div>
  )
}