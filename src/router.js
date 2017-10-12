import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginContainer from './components/fb_login/login_container';
import DashboardContainer from './components/dashboard/dashboard_container';
import TripMapContainer from './components/map/trip_map_container';
import SplashContainer from './components/splash/splash_container';
import TripFormContainer from './components/trips/trip_form_container';

const Routers = StackNavigator(
  {
    Splash: { screen: SplashContainer },
    TripForm: { screen: TripFormContainer },
    Login: { screen: LoginContainer },
    TripMap: { screen: TripMapContainer },
    Dashboard: { screen: DashboardContainer }
  },
  { headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
    }
  }
);

export default Routers;
