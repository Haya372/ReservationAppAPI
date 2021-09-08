import React from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';

export default function MyList(props){
  const items = [];
  const primary = props.primary;

  props.items.forEach((item) => {
    let secondary = "";
    if(typeof props.secondary === 'object'){
      Object.keys(props.secondary).forEach((key) => {
        secondary += props.secondary[key].text + ' : ' + JSON.stringify(item[key]);
        if(props[key]?.suffix){
          secondary += props.secondary[key].suffix + " ";
        }else{
          secondary += " ";
        }
      });
    }

    items.push(
      <div key={item.id} className="rounded" className="p-4 flex items-center border hover:bg-gray-200">
        <div className="flex-grow">
          <ListItemText primary={item[primary]} secondary={secondary} />
        </div>
        <ArrowForwardIosIcon />
      </div>
    );
  });

  return (
    <div>
      <List>
        {items}
      </List>
    </div>
  )
}