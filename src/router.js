import React from 'react';
import  { StackNavigator } from 'react-navigation';
import Login from './components/fb_login/login';
import DashboardContainer from './components/dashboard/dashboard_container';

const Routers = StackNavigator({
  Login: { screen: Login },
  Dashboard: { screen: DashboardContainer }
});

export default Routers;
