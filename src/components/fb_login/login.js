import React from 'react';
import {
  View,
  Button, Text
} from 'react-native';

import {
  LoginButton,
  AccessToken,
  LoginManager
} from 'react-native-fbsdk';

import * as firebase from 'firebase';
import firebaseRef from '../../firebase';

firebaseRef();

class FacebookLogin extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                    firebase.auth().signInWithCredential(credential).then((result) => {
                      // Success
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
          onLogoutFinished={() => alert("You have been logged out.")}/>
      </View>
    );
  }
}

export default FacebookLogin;
