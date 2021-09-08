import React from 'react';
import Header from './header.jsx';
import { useHistory } from 'react-router';


export default function Layout(props){
  const history = useHistory();

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Header header={props.header} />
      <div className="m-4 flex-grow">
        {props.children}
      </div>
    </div>
  )
}