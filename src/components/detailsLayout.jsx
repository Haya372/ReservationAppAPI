import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios.js';
import equal from '../utils/equal.js';
import resources from '../utils/resources.js';
import { useHistory } from 'react-router';
import SuccessAlert from './successAlert.jsx';
import ErrorAlert from './errorAlert.jsx';

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
  disabled: Boolean,
  root: String,
  delete: Boolean
}
*/

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

export default function DetailsLayout(props){
  const [lock, setLock] = useState(true);
  const [item, setItem] = useState({});
  const [savedItem, setSavedItem] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(null);
  const history = useHistory();

  useEffect(async() => {
    try {
      const res = await axios.get(props.apiPath);
      const sItem = {
        ...res.data
      };
      setSavedItem(sItem);
      setItem(res.data);
    } catch(err){
      alert(err);
    }
  }, []);

  const onClickCancel = () => {
    setItem(savedItem);
    setLock(true);
  }

  useEffect(() => {
    return () => {
      if(timer){
        clearTimeout(timer);
      }
    }
  }, [timer]);


  const onClickUpdate = async () => {
    try {
      const res = await axios.patch(props.apiPath, item);
      const sItem = {
        ...res.data
      };
      setSavedItem(sItem);
      setItem(res.data);
      setLock(true);
      setSuccess(true);
      const t = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setTimer(t);
    } catch(err) {
      setError(true);
      const t = setTimeout(() => {
        setError(false);
      }, 3000);
      setTimer(t);
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

  const onClickDelete = async () => {
    try {
      const res = await axios.delete(props.apiPath);
      history.push(props.root)
    } catch(err) {
      setError(true);
      const t = setTimeout(() => {
        setError(false);
      }, 3000);
      setTimer(t);
    }
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
            { props.delete ?
              <div className="text-red-500">
                <Button
                  variant="outlined"
                  onClick={onClickDelete}
                  color='inherit'
                >
                  Delete
                </Button>
              </div>
            : null
            }
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
      {success ? <SuccessAlert message="更新しました" /> : null}
      {error ? <ErrorAlert message="更新に失敗しました" /> : null}
    </div>
  )
}