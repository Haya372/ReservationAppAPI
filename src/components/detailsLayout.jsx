import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios.js';
import equal from '../utils/equal.js';
import resources from '../utils/resources.js';

/*
 props: {
  apiPath: String,
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
  disabled: Boolean
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

export default function DetailsLayout(props){
  const [lock, setLock] = useState(true);
  const [item, setItem] = useState({});
  const [savedItem, setSavedItem] = useState({});

  useEffect(async() => {
    try {
      const res = await axios.get(props.apiPath);
      setItem(res.data);
      setSavedItem(res.data);
    } catch(err){
      alert(err);
    }
  }, []);

  const onClickCancel = () => {
    setItem(savedItem);
    setLock(true);
  }


  const onClickUpdate = async () => {
    try {
      const res = await axios.patch(props.apiPath, item);
      setSavedItem(res.data);
      setItem(res.data);
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
      value,
      onChange,
      disabled: lock,
      ...conf.props,
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

  const disabledUpdateButton = () => {
    if(Object.keys(item).length == 0){
      return true;
    }
    let disabled = true;
    Object.keys(props.conf).forEach((key) => {
      disabled = disabled && equal(item[key], savedItem[key]);
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
        <Grid item xs={10} />
        <Grid item xs={2}>
          <Checkbox
            checked={lock}
            icon={<LockOpenIcon />}
            checkedIcon={<LockIcon />}
            onChange={(e) => {
              if(!props.disabled){
                if(e.target.checked) onClickCancel();
                setLock(e.target.checked)
              }
            }}
          />
        </Grid>
        { gridItems }
        { lock || props.disabled == true ?
          null
        :
        <Grid item xs={12}>
          <div className="flex justify-around">
            <div className="text-blue-400">
              <Button
                variant="outlined"
                onClick={onClickUpdate}
                color='inherit'
                disabled={disabledUpdateButton()}
              >
                Update
              </Button>
            </div>
            <div className="text-pink-400">
              <Button
                variant="outlined"
                onClick={onClickCancel}
                color='inherit'
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
        }
      </Grid>
    </div>
  )
}