import React from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';
import { ActionButton } from 'react-native-material-ui';
import * as firebase from 'firebase';
import DashboardItem from './dashboard_item';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToTripForm = this.redirectToTripForm.bind(this);
  }

  redirectToTripForm() {
    this.props.navigation.navigate('NewTripForm');
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
           Welcome, { this.props.currentUser.name }!
        </Text>

        <FlatList data={ this.props.trips }
                  keyExtractor={item => Object.keys(item)[0]}
                  renderItem={ ({ item }) =>
                    <DashboardItem
                                   id={ Object.keys(item)[0]}
                                   title={ Object.values(item)[0] }/> }/>

        <LoginButton />
        <ActionButton onPress={ this.redirectToTripForm } />
      </View>
    );
  }
}

export default Dashboard;
