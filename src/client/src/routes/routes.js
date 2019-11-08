import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../components/Login/LoginPage';
import RegisterPage from '../components/Register/RegisterPage';
import { EditProfilePage } from '../components/Profile/EditProfilePage';
import { ProfilePage } from '../components/Profile/ProfilePage'; 
import { Verify } from '../components/Verify/Verify';


const PATHS = {
  LOGIN: `(/|/login)`,
  VERIFY: `/verify`,
  REGISTER: `/register`,
  VIEW_USER_PROFILE: `/card/:username`,
  EDIT_USER_PROFILE: `/card/:username/admin`
}
export const Routes = (props) => {

  return (
    <Switch>
      <Route exact path={PATHS.LOGIN} component={LoginPage} />
      <Route exact path={PATHS.VERIFY} component={Verify} />
      <Route exact path={PATHS.REGISTER} component={RegisterPage} />
      <Route exact path={PATHS.VIEW_USER_PROFILE} component={ProfilePage} />
      <Route exact path={PATHS.EDIT_USER_PROFILE} component={EditProfilePage} />

      {/* <Route exact path="/verify/:token" component={RedirectWithToken} />
      <Route path="*" component={Error404} /> */}
    </Switch>
  )
}