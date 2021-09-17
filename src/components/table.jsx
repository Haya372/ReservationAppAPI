import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router';
import resources from '../utils/resources.js';
import { Link } from 'react-router-dom'

const getItem = (key, conf, item) => {
  if(item[key] != undefined && item[key] != null){
    return item[key];
  }
  switch(conf.type){
    case 'object':
      return {};
    case 'number':
      return 0;
    case 'array':
      return [];
    case 'boolean':
      return false;
    default:
      return '';
  }
}

export default function MyTable(props){
  const items = [];
  const history = useHistory();
  const header = [];

  Object.keys(props.conf).forEach((key) => {
    const conf = props.conf[key];
    header.push(<TableCell key={key} variant="head">{conf.text}</TableCell>)
  });
  
  props.items.forEach((item, idx) => {
    const rows = [];

    Object.keys(props.conf).forEach((key) => {
      const conf = props.conf[key];
      const value = getItem(key, conf, item);

      const inputProps = {
        value,
        ...conf.props
      };

      if(typeof conf.component == 'function'){
        rows.push(<TableCell align="left" key={key}>
            {conf.component(inputProps)}
          </TableCell>)
      }else if(typeof conf.component == 'string'){
        rows.push(<TableCell align="left" key={key}>
          {resources[conf.component](inputProps)}
        </TableCell>)
      }else{
        if(conf.link){
          const onClick = () => {
            history.push({
              pathname: `${props.link}/${item[props.id]}`,
              hash: '#details'
            });
          }
          rows.push(<TableCell align="left" key={key}>
            <div className="text-blue-400 underline hover:text-blue-700" onClick={onClick}>{value}</div>
          </TableCell>);
        }else{
          rows.push(<TableCell align="left" key={key}>{value}</TableCell>);
        }
      }
    });

    items.push(<TableRow key={idx}>{rows}</TableRow>);
  });

  return (
    <Table>
      <TableHead>
        <TableRow>{header}</TableRow>
      </TableHead>
      <TableBody>
        {items}
      </TableBody>
    </Table>
  )


}