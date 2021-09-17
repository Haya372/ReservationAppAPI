import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Password from "./password.jsx";
import axios from '../utils/axios.js';

export default function EditPassword(props){
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onClickChange = async () => {
    try {
      const res = await axios.patch(props.apiPath, {
        oldPassword: oldPassword,
        password: newPassword
      })
      setOldPassword("");
      setNewPassword("");
      if(res.status == 200 || res.status == 204){
        setShow(false);
        props.error(false);
        props.success(true);
      }else{
        throw "failed";
      }
    } catch (err) {
      setOldPassword("");
      setNewPassword("");
      props.success(false);
      props.error(true);
      setShow(false);
    }
  }

  return (
    <div>
      <Button onClick={() => setShow(true)} variant="outlined">パスワードを変更する</Button>
      { show ? 
        ReactDOM.createPortal((
          <div className="fixed z-10 inset-0 w-screen h-screen bg-gray-400 bg-opacity-60">
            <div className="fixed top-1/2 left-1/2 w-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
              <Card>
                <CardContent>
                  <div className="my-4">
                    <Password
                      label="古いパスワード"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="my-4">
                    <Password
                      label="新しいパスワード"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex my-4 justify-around">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={onClickChange}
                      disabled={oldPassword.length == 0 || newPassword.length == 0}
                    >
                      変更する
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShow(false)}
                    >キャンセル
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ), document.getElementById('modal'))
      : null }
    </div>
  )
}