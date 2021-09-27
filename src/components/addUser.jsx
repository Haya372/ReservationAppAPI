import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from '../utils/axios.js';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

export default function AddUser(props){
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  const onSearch = async (e) => {
    try {
      console.log(e.target.value)
      const res = await axios.get(`/api/admin/search_user?search=${e.target.value}`);
      console.log(res.data)
      setOptions(res.data.filter(item => !value.includes(item.id)));
    }catch(err){
      console.log(err);
    }
  }

  const onChange = (e, value) => {
    setValue(value.map(item => item.id));
  }

  useEffect(async () => {
    try {
      const res = await axios.get(`/api/admin/search_user?search=`);
      setOptions(res.data.filter(item => !value.includes(item.id)));
    }catch(err){
      console.log(err);
    }
  }, []);

  const onClick = async () => {
    try {
      const res = await axios.post(`/api/admin/organization/${props.organizationId}/user`, { users: value });
      props.setShow(false);
      props.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return ReactDOM.createPortal((
    <div className="fixed z-10 inset-0 w-screen h-screen bg-gray-400 bg-opacity-60">
      <div className="fixed top-1/2 left-1/2 w-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
        <Card>
          <CardContent>
            <div>
              <Autocomplete
                multiple
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="追加するユーザー"
                    onChange={onSearch}
                  />
                )}
                options={options}
                onChange={onChange}
              />
            </div>
            <div className="flex my-4 justify-around">
              <div className="text-blue-400">
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  onClick={onClick}
                  disabled={value.length == 0}
                >
                  追加する
                </Button>
              </div>
              <div className="text-red-400">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => props.setShow(false)}
                >キャンセル
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    ), document.getElementById('modal'))
}