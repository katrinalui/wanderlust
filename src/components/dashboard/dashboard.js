import React from 'react';
import {
  View,
  Text
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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
           Welcome, {this.props.currentUser.name}!
        </Text>

        <LoginButton />
      </View>
    );
  }
}

export default Dashboard;
