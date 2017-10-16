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
import { COLOR, ActionButton, Toolbar } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
        const tripMembersRef = firebase.database().ref(`/trips/${this.state.addTripID}/members`);
        const userID = this.props.currentUser.id;
        const usersTripsRef = firebase.database().ref(`/users/${userID}/trips/`);
        tripMembersRef.update({ [userID]: this.props.currentUser.name });
        tripTitle = tripSnap.val().title;
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
          centerElement={`My Trips`}
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
                                   /> }/>
         <Modal
           animationType="slide"
           transparent={ true }
           visible={ this.state.modalVisible }>
           <View style={ styles.modalContainer }>
             <View style={ styles.innerModalContainer }>
               <Icon name='close'
                 size={ 18 }
                 style={{ position: 'absolute', top: 12, left: 12 }}
                 onPress={() => this.setModalVisible(false)}
                 color={COLOR.grey700} />
               <Text style={ { fontSize: 22, fontWeight: '500', paddingBottom: 10, paddingTop: 18 } }>Join a trip!</Text>
               <TextInput
                 style={ { width: 200, textAlign: 'center', paddingBottom: 10 } }
                 placeholder="Enter code"
                 onChangeText={ this.handleChange }/>
               <TouchableHighlight onPress={ this.handlePress }>
                 <Text style={ {color: COLOR.blue700, paddingBottom: 10, fontSize: 20 } }>
                   Join
                 </Text>
               </TouchableHighlight>

               <Text>
                 { this.state.error }
               </Text>
             </View>
           </View>
         </Modal>
        <TouchableHighlight
          onPress={() => { this.setModalVisible(true); } }>
          <Text style={ { color: 'white', fontSize: 20, paddingTop: 15 } }>
            Join Trip
          </Text>
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
    position: 'relative'
  }
});

// <LoginButton />
