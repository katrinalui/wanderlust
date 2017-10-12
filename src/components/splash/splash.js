import React from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  AccessToken
} from 'react-native-fbsdk';

import * as firebase from 'firebase';


class Splash extends React.Component {
  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(token => {
      if (token) {
        firebase.database().ref(`/users/${token.userID}`)
                .on('value', (snap) => this.props.receiveCurrentUser(snap.val()));
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

}

export default Splash;
