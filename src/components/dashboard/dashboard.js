import React from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';
import Swipeout from 'react-native-swipeout';
import { ActionButton } from 'react-native-material-ui';
import * as firebase from 'firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToTripForm = this.redirectToTripForm.bind(this);
  }

  redirectToTripForm() {
    this.props.navigation.navigate('NewTripForm');
  }

  handleEditButton() {
    console.log('inside edit!');
  }

  handleDeleteButton() {
    console.log('inside delete!');
  }

  render() {
    console.log('props', this.props);
    if (!this.props.currentUser) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    }

    let swipeoutBtns = [
      {
        text: 'Edit',
        backgroundColor: 'orange',
        onPress: this.handleEditButton
      },
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: this.handleDeleteButton }
    ];

    const { width } = Dimensions.get('window');

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
           Welcome, { this.props.currentUser.name }!
        </Text>
        <Swipeout
          right={swipeoutBtns}>
          <View>
            <Text style={{
                width,
                height: 60,
                fontSize: 24}
              }>Spain 2017</Text>
          </View>
        </Swipeout>
        <LoginButton />
        <ActionButton onPress={ this.redirectToTripForm } />
      </View>
    );
  }
}

export default Dashboard;
