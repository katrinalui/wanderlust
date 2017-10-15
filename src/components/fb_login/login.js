import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

import * as firebase from 'firebase';

class FacebookLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  buttonStyle() {
    if (this.state.isLoggedIn) {
      return {
        height: 0,
        opacity: 0
      };
    } else {
      return {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f2b4b'
      };
    }
  }

  render() {
    const style = this.buttonStyle();

    return (
      <View style={style}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../../../assets/images/logo_with_name.png')}
          resizeMode="contain"
          style={{width: 300, height: 400}} />
        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login cancelled.");
              } else {
                this.setState({ isLoggedIn: true });
                AccessToken.getCurrentAccessToken().then(
                  (token) => {
                    const credential = firebase.auth.FacebookAuthProvider
                                               .credential(token.accessToken);

                    firebase.auth().signInWithCredential(credential)
                            .then((result) => {
                              const userRef = firebase.database().ref(`/users/${token.userID}`);

                              userRef.once('value', snap => {
                                if (!snap.val()) {
                                  const name = result.displayName;
                                  const email = result.email;
                                  const profilePic = result.photoURL;
                                  const userProfile = {
                                    id: token.userID,
                                    name,
                                    email,
                                    profilePic
                                  };
                                  userRef.set(userProfile);
                                  this.props.receiveCurrentUser(userProfile);
                                } else {
                                  firebase.database().ref(`/users/${token.userID}`)
                                          .on('value', (snap) => this.props.receiveCurrentUser(snap.val()));
                                }
                              });

                              this.props.navigation.navigate('Dashboard');
                    }, error => {
                      console.log(error);
                    });
                  }, (error => {
                    console.log(error);
                  })
                );
              }
            }
          }
          />
      </View>
    );
  }
}

export default FacebookLogin;

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    height: 70
  },
});
