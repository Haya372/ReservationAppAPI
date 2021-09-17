import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios.js';
import resources from '../utils/resources.js';
import { useHistory } from 'react-router';
import ErrorAlert from './errorAlert.jsx';

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
    case 'boolean':
      return false;
    default:
      return '';
  }
}

export default function CreateLayout(props){
  const [item, setItem] = useState({});
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(null);
  const history = useHistory();

  const onClickCreate = async () => {
    try {
      const res = await axios.post(props.apiPath, item);
      const id = res.data.id;
      if(props.resourceName == 'organization'){
        history.push({
          pathname: `/organization/${id}`,
          hash: "#details"
        });
      }else if(props.resourceName == 'space'){
        history.push({
          pathname: `/organization/${props.organizationId}/space/${id}`,
          hash: "#details"
        });
      }
    } catch(err) {
      setError(true);
      const t = setTimeout(() => {
        setError(false);
      }, 3000);
      setTimer(t);
    }
  }

  useEffect(() => {
    return () => {
      if(timer){
        clearTimeout(timer);
      }
    }
  }, [timer]);

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
      {error ? <ErrorAlert message="作成に失敗しました" /> : null}
    </div>
  )
}