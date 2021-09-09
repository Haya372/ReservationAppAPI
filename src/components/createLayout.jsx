import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios.js';
import resources from '../utils/resources.js';
import { useHistory } from 'react-router';

/*
 props: {
  apiPath: String,
  resourceName: String,
  conf : {
    key: {
      props: Object,
      component: string || function,
      classes: String,
      required: Boolean,
      size: Integer
    },
    ...
  },
  organizationId: String || Integer
}
*/

const getItem = (key, conf, item) => {
  if(item[key] != undefined){
    return item[key];
  }
  switch(conf.type){
    case 'object':
      return {};
    case 'number':
      return 0;
    case 'array':
      return [];
    default:
      return '';
  }
}

export default function CreateLayout(props){
  const [item, setItem] = useState({});
  const history = useHistory();

  const onClickCreate = async () => {
    try {
      const res = await axios.post(props.apiPath, item);
      const id = res.data.id;
      if(props.resourceName == 'organization'){
        history.push(`/organization/${id}/space`)
      }else{
        history.push(`/organization/${props.organizationId}/space/${id}/reservation`)
      }
    } catch(err) {
      alert(err);
    }
  }

  const gridItems = [];

  Object.keys(props.conf).forEach((key) => {
    const conf = props.conf[key];
    const value = getItem(key, conf ,item);

    const onChange = (e) => {
      const copy = {
        ...item,
      };
      copy[key] = e.target.value;
      setItem(copy);
    }

    const inputProps = {
      ...conf.props,
      value,
      onChange,
    }
    if(typeof conf.component == 'function'){
      gridItems.push(<Grid item xs={conf.size || 12} key={key}>
          <div className={conf.classes || ""}>
            {conf.component(inputProps)}
          </div>
        </Grid>)
    }else if(typeof conf.component == 'string'){
      gridItems.push(<Grid item xs={conf.size || 12} key={key}>
        <div className={conf.classes || ""}>
          {resources[conf.component](inputProps)}
        </div>
      </Grid>)
    }

  });

  const disabledCreateButton = () => {
    if(Object.keys(item).length == 0){
      return true;
    }
    let disabled = false;
    Object.keys(props.conf).forEach((key) => {
      if(props.conf[key].required){
        if(!item[key]){
          disabled = true;
        }
      }
    });
    return disabled;
  }

  return (
    <div>
      <Grid container spacing={3}>
        { gridItems }
        <Grid item xs={12}>
          <div className="flex justify-around">
            <div className="text-blue-400">
              <Button
                variant="outlined"
                onClick={onClickCreate}
                color='inherit'
                disabled={disabledCreateButton()}
              >
                Create
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}