import React, { useState } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import Layout from '../components/layout.jsx';
import CardContent from '@material-ui/core/CardContent';
import TextForm from '../components/textform.jsx';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

export default function Login(props){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  if(localStorage.getItem('token')){
    history.push('/');
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        email: email, password: password
      });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    } catch(err) {
      alert(err);
    }
  }
  
  return (
    <Layout header="Login">
      <div className="max-w-lg m-auto">
        <Card>
          <CardContent>
            <div className="text-center my-2">Login</div>
            <Divider />
            <form onSubmit={onLogin}>
              <div className="my-2">
                <TextForm
                  label="email"
                  value={email}
                  onChange={onChangeEmail}
                  fullWidth
                  notNull
                />
              </div>
              <div className="my-2">
                <TextForm
                  label="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  fullWidth
                  notNull
                />
              </div>
              <div className="my-4 text-center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={email.length == 0 || password.length == 0}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}