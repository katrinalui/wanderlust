import React from 'react';
import  { StackNavigator } from 'react-navigation';
import Login from './components/fb_login/login';
import DashboardContainer from './components/dashboard/dashboard_container';
import TripMapContainer from './components/map/trip_map_container';

const Routers = StackNavigator({
  TripMap: { screen: TripMapContainer },
  Login: { screen: Login },
  Dashboard: { screen: DashboardContainer }
});

export default Routers;
