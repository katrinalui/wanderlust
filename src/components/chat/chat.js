import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import Message from './message';
import TripToolbar from '../trips/trip_toolbar';

const window = Dimensions.get('window');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      messages: []
    };
    this.tripID = props.navigation.state.params.id;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToMap = this.redirectToMap.bind(this);
  }

  componentWillMount() {
    const messagesRef = firebase.database()
                                .ref(`/messages/${this.tripID}`);
    messagesRef.on("child_added", snap => this.setState(prevState => {
      console.log(prevState);
       return { messages: prevState.messages.concat([snap.val()]) };
     }));
  }

  handleChange(text) {
    this.setState({ body: text });
  }

  handleSubmit() {
    this.props.postMessage(this.state,
                           this.props.currentUser,
                           this.tripID);
    this.setState({ body: '' });
  }

  redirectToMap() {
    this.props.navigation.navigate("TripMap", { id: this.tripID });
  }

  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TripToolbar
            type="chat"
            tripID={this.tripID}
            title={this.props.currentUser.trips[this.tripID]}
            navigation={this.props.navigation}
          />

          <FlatList
            keyExtractor={item => item.id}
            data={this.state.messages}
            renderItem={item => <Message message={item} />}
          />

            <TextInput placeholder="Text here..."
                       style={styles.input}
                       value={this.state.body}
                       onChangeText={(text) => this.handleChange(text)}/>
                     <Button title='Submit'
                              onPress={this.handleSubmit}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: window.width - 30,
  }
});
