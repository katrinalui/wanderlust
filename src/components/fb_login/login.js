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

class Login extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString());
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

export default Login;
