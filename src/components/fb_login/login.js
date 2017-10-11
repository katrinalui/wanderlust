import React from 'react';
import {
  View,
  Button, Text
} from 'react-native';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
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
                      console.log(result);
                      const userRef = firebase.database().ref(`/users/${result.uid}`);
                      userRef.set({
                        name: result.displayName,
                        email: result.email,
                        profilePic: result.photoURL
                      });
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
