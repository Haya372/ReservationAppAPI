import React from 'react';

export default function Layout(props){
  return (
    <div className="min-h-screen flex flex-row justify-center">
      <div className="m-4 flex-grow">
        {props.children}
      </div>
    </div>
  )
}