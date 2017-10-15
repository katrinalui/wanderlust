import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Share,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';
import { ActionButton } from 'react-native-material-ui';
import * as firebase from 'firebase';
import DashboardItem from './dashboard_item';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToTripForm = this.redirectToTripForm.bind(this);
  }

  redirectToTripForm() {
    this.props.navigation.navigate('NewTripForm');
  }

  render() {
    if (!this.props.currentUser) {
      return (
        <View style={ styles.content }>
          <Text style={ styles.h1 }>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={ styles.content }>
        <View style={ styles.header }>
          <StatusBar barStyle="light-content" />
          <Text style={ styles.h1 }>
             Welcome, { this.props.currentUser.name }!
          </Text>
        </View>

        <FlatList data={ this.props.trips }
                  keyExtractor={item => Object.keys(item)[0]}
                  renderItem={ ({ item }) =>
                    <DashboardItem
                                   id={ Object.keys(item)[0]}
                                   title={ Object.values(item)[0] }
                                   navigation={ this.props.navigation }/> }/>

        <LoginButton />
        <ActionButton onPress={ this.redirectToTripForm } />
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2b4b'
  },
  h1: {
    fontWeight: '500',
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    height: 70
  },
});
