import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextForm from './textform.jsx';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios.js';

export default function OrganizationDetail(props){
  const [lock, setLock] = useState(true);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState({});

  useEffect(async() => {
    try {
      const res = await axios.get(`/api/organization/${props.id}`);
      setOrganization(res.data);
    } catch(err){
      alert(err);
    }
  }, []);

  useEffect(() => {
    if(organization.name){
      setName(organization.name);
    }
  }, [organization]);

  const onClickCancel = () => {
    setName(organization.name);
  }


  const onClickUpdate = async () => {
    try {
      const res = await axios.patch(`/api/organization/${organization.id}`, {
        name: name
      });
      setOrganization(res.data);
    } catch(err) {
      alert(err);
    }
  }

  const disabledUpdateButton = () => {
    if(!name){
      return true;
    }
    let disabled = false;
    if(name.length == 0){
      disabled = true;
    }
    if(name == organization.name){
      disabled = true;
    }
    return disabled;
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TextForm
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            notNull
            disabled={lock}
          />
        </Grid>
        <Grid item xs={2}>
          <Checkbox
            checked={lock}
            icon={<LockOpenIcon />}
            checkedIcon={<LockIcon />}
            onChange={(e) => {
              if(e.target.checked) onClickCancel();
              if(props.editable) setLock(e.target.checked)
            }}
          />
        </Grid>
        { lock ?
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