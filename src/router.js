import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginContainer from './components/fb_login/login_container';
import DashboardContainer from './components/dashboard/dashboard_container';
import TripMapContainer from './components/map/trip_map_container';
import SplashContainer from './components/splash/splash_container';
import NewTripFormContainer from './components/trips/new_trip_form_container';
import EditTripFormContainer from './components/trips/edit_trip_form_container';
import ChatContainer from './components/chat/chat_container';

const Routers = StackNavigator(
  {
    Splash: { screen: SplashContainer },
    Dashboard: { screen: DashboardContainer },
    Chat: {
      screen: ChatContainer,
      navigationOptions: {
        gesturesEnabled: true
      }
    },
    TripMap: { screen: TripMapContainer },
    NewTripForm: {
      screen: NewTripFormContainer,
      navigationOptions: {
        gesturesEnabled: true
      }
    },
    EditTripForm: {
      screen: EditTripFormContainer,
      navigationOptions: {
        gesturesEnabled: true
      }
    },
    Login: { screen: LoginContainer }
  },
  { headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
    }
  }
);

export default Routers;
