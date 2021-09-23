import React from 'react';

const datetimeParser = (d) => {
  if(typeof d == 'string') return d;
  const yyyy = d.getFullYear().toString();
  const MM = ('000' + (d.getMonth() + 1).toString()).slice(-2);
  const dd = ('000' + d.getDate().toString()).slice(-2);
  const hh = ('000' + d.getHours().toString()).slice(-2);
  const mm = ('000' + d.getMinutes().toString()).slice(-2);
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
}

export default function DatetimeCell(props){
  const value = new Date(props.value);

  return (
    <div>
      {datetimeParser(value)}
    </div>
  )
}