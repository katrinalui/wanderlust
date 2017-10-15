import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Share,
  TouchableHighlight,
  StatusBar,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';
import { ActionButton, Toolbar } from 'react-native-material-ui';
import * as firebase from 'firebase';
import DashboardItem from './dashboard_item';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      addTripID: '',
      error: ''
    };
    this.redirectToTripForm = this.redirectToTripForm.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  redirectToTripForm() {
    this.props.navigation.navigate('NewTripForm');
  }

  setModalVisible(visable) {
    this.setState({modalVisible: visable,
                   error: ''});
  }

  handleChange(tripID) {
    this.setState({addTripID: tripID});
  }

  redirectToChat() {
    this.setState({modalVisible: false}, () =>
                  this.props.navigation.navigate("Chat", { id: this.state.addTripID }));
  }

  handlePress() {

    if (!this.state.addTripID) {
      this.setState({ error: 'Please enter a valid trip code.'});
    } else {
      this.postToFirebase();
    }
  }

  postToFirebase() {
    let tripTitle;
    const tripRef = firebase.database().ref(`/trips/${this.state.addTripID}`);
    tripRef.once('value', tripSnap => {

      if (tripSnap.val()) {
        tripTitle = tripSnap.val().title;
        const userID = this.props.currentUser.id;
        const usersTripsRef = firebase.database().ref(`/users/${userID}/trips/`);
        usersTripsRef.update({ [tripSnap.val().id]: tripTitle });
        this.redirectToChat();
      } else {
        this.setState({ error: 'Invalid Trip Code' });
      }
    } );
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
        <Toolbar
          style={{ container: { paddingTop: 35, paddingBottom: 20, height: 65 } }}
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          centerElement={`Welcome, ${ this.props.currentUser.name }!`}
        />
        <View style={ styles.header }>
          <StatusBar barStyle="light-content" />
        </View>
        <FlatList bounces={ false }
                  data={ this.props.trips }
                  keyExtractor={ item => Object.keys(item)[0] }
                  renderItem={ ({ item }) =>
                    <DashboardItem
                                   id={ Object.keys(item)[0] }
                                   title={ Object.values(item)[0] }
                                   navigation={ this.props.navigation }
                                   currentUserID={ this.props.currentUser.id }
                                   /> }/>
         <Modal
           animationType="slide"
           transparent={ true }
           visible={ this.state.modalVisible }>
           <View style={ styles.modalContainer }>
             <View style={ styles.innerModalContainer }>
               <Text style={ { fontSize: 22, fontWeight: '500', paddingBottom: 10, paddingTop: 18 } }>Join A Trip!</Text>
               <TextInput
                 style={ { width: 200, textAlign: 'center', paddingBottom: 10 } }
                 placeholder="Enter code"
                 onChangeText={ this.handleChange }/>
               <TouchableHighlight onPress={ this.handlePress }>
                 <Text style={ {color: 'green', paddingBottom: 10 } }>Join</Text>
               </TouchableHighlight>
               <TouchableHighlight onPress={() => {
                   this.setModalVisible(!this.state.modalVisible);
                 }}>
                 <Text style={ { color: 'red', paddingBottom: 10 } }>Cancel</Text>
               </TouchableHighlight>
               <Text>
                 { this.state.error }
               </Text>
             </View>
           </View>
         </Modal>
        <TouchableHighlight
          onPress={() => { this.setModalVisible(true); } }>
          <Text style={ { color: 'white', fontSize: 20, paddingTop: 15 } }>Join Trip</Text>
        </TouchableHighlight>
        <ActionButton onPress={ this.redirectToTripForm } />
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  content: {
    paddingBottom: 15,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  innerModalContainer: {
    width: 300,
    height: 150,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  }
});

// <LoginButton />
