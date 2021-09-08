import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router';

export default function MyList(props){
  const items = [];
  const primary = props.primary;
  const history = useHistory();

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

    const onClick = () => {
      const path = `${props.basePath}/${item[props.id]}`;
      history.push(path);
    }

    items.push(
      <div key={item.id}
        className="rounded"
        className="p-4 flex items-center border hover:bg-gray-200"
        onClick={onClick}
      >
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