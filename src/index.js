import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './pages/login.jsx';
import Home from "./pages/home.jsx";
import Organization from "./pages/organization.jsx";
import Space from "./pages/space.jsx";
import OrganizationCreate from "./pages/organizationCreate.jsx";
import SpaceCreate from "./pages/spaceCreate.jsx";
import User from "./pages/user.jsx";
import Reservation from "./pages/reservation.jsx";
import ReservationCreate from "./pages/reservationCreate.jsx";
import "./styles.css";
import theme from "./utils/theme.js";
import { ThemeProvider } from "@material-ui/styles";

const CustomRoute = (props) => {
  if(localStorage.getItem('token')){
    return <Route path={props.path} exact={props.exact}>{props.children}</Route>
  }
  return <Redirect to="/login" />
}

const Index = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <CustomRoute path="/" exact>
              <Home />
            </CustomRoute>
            <CustomRoute path="/organization/new" exact>
              <OrganizationCreate />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id" exact>
              <Organization />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id/space/new" exact>
              <SpaceCreate />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id/space/:space_id" exact>
              <Space />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id/space/:space_id/reservation/new" exact>
              <ReservationCreate />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id/space/:space_id/reservation/:reservation_id" exact>
              <Reservation />
            </CustomRoute>
            <CustomRoute path="/organization/:organization_id/user/:user_id" exact>
              <User />
            </CustomRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  )
  ;
};

ReactDOM.render(<Index />, document.getElementById("index")); 