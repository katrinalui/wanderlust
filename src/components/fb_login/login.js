import React from 'react';
import {
  View
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
          publishPermissions={["publish_actions"]}
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


// Attempt a login using the Facebook login dialog asking for default permissions.
LoginManager.logInWithReadPermissions(['public_profile']).then(
  function(result) {
    if (result.isCancelled) {
      alert('Login cancelled');
    } else {
      alert('Login success with permissions: '
        +result.grantedPermissions.toString());
    }
  },
  function(error) {
    alert('Login fail with error: ' + error);
  }
);

export default Login;
