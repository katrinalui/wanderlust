import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginContainer from './components/fb_login/login_container';
import DashboardContainer from './components/dashboard/dashboard_container';
import TripMapContainer from './components/map/trip_map_container';
import SplashPage from './components/splash/splash';

const Routers = StackNavigator(
  {
    Splash: { screen: SplashPage },
    Login: { screen: LoginContainer },
    TripMap: { screen: TripMapContainer },
    Dashboard: { screen: DashboardContainer }
  },
  { headerMode: 'none' }
);

export default Routers;
