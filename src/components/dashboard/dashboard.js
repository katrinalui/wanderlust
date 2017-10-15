import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Share
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

  _shareTextMessage () {
    Share.share({
      message: 'Join my trip plans at Wanderlust',
      url: 'http://google.com'
    })
    .then(this._showResult)
    .catch(err => console.log(err));
  }

  _showResult (result) {
     console.log(result);
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
        <Text style={ styles.h1 }>
           Welcome, { this.props.currentUser.name }!
        </Text>

        <FlatList data={ this.props.trips }
                  keyExtractor={item => Object.keys(item)[0]}
                  renderItem={ ({ item }) =>
                    <DashboardItem
                                   id={ Object.keys(item)[0]}
                                   title={ Object.values(item)[0] }
                                   navigation={ this.props.navigation }/> }/>

        <LoginButton />
        <ActionButton onPress={ this.redirectToTripForm } />
        <TouchableHighlight onPress={this._shareTextWithTitle}>
          <View style={styles.button}>
            <Text>Click to share a Trip</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  h1: {
    fontWeight: '700',
    alignSelf: 'center',
    color: '#431833',
    fontSize: 24
  },
  button: {
    backgroundColor: '#76c9f8',
    padding: 10,
    margin: 10,
    borderRadius: 5
  }
});
