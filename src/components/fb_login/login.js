import React from 'react';
import {
  View,
  Button, Text
} from 'react-native';

import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

import * as firebase from 'firebase';

class FacebookLogin extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "email"]}
          autoLogoutLink={false}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {

                    const credential = firebase.auth.FacebookAuthProvider
                                               .credential(data.accessToken);

                    firebase.auth().signInWithCredential(credential)
                            .then((result) => {
                              const userRef = firebase.database().ref(`/users/${data.userID}`);

                              const name = result.displayName;
                              const email = result.email;
                              const profilePic = result.photoURL;

                              userRef.set({
                                name,
                                email,
                                profilePic
                              });

                              this.props.receiveCurrentUser({
                                name,
                                profilePic
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
