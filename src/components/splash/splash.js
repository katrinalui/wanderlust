import React from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  AccessToken
} from 'react-native-fbsdk';

import * as firebase from 'firebase';

const QUOTES = ["The world is a book and those who do not travel read only one page.",
                "A good traveler has no fixed plans and is not intent on arriving.",
                "The traveler sees what he sees. The tourist sees what he has come to see."];

class SplashPage extends React.Component {
  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(token => {
      if (token) {
        firebase.database().ref(`/users/${token.userID}`)
                .on('value', (snap) => console.log(snap.val()));
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('Login');
        }, 2000);
      }
    });
  }

  render() {
    const randomQuote = QUOTES[Math.floor(Math.random() * 3)];
    return (
      <View>
        <Text style={{textAlign:'center'}}>
          { randomQuote }
        </Text>
      </View>
    );
  }

}

export default SplashPage;
