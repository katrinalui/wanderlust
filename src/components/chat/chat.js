import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  ScrollView
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
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  componentWillMount() {
    const messagesRef = firebase.database()
                                .ref(`/messages/${this.tripID}`);
    messagesRef.on("value", snap => this.setState({
      messages: Object.values(snap.val())
    }));
  }
  //
  // componentDidUpdate() {
  //   this.scrollToEnd();
  // }

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

  scrollToEnd() {
    this.flatListRef.scrollToEnd({animated: false});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TripToolbar
            type="chat"
            tripID={this.tripID}
            title={this.props.currentUser.trips[this.tripID]}
            navigation={this.props.navigation}
          />

        <View style={styles.chat} >
          <FlatList
            keyExtractor={item => item.id}
            ref={ref => { this.flatListRef = ref; }}
            onContentSizeChange={this.scrollToEnd}
            data={this.state.messages}
            renderItem={item => <Message message={item} />}
          />

          <TextInput placeholder="Text here..."
                     style={styles.input}
                     value={this.state.body}
                     onFocus={this.scrollToEnd}
                     onChange={this.scrollToEnd}
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
    width: window.width,
    marginHorizontal: 0
  },
  chat: {
    flex: 1,
    justifyContent: 'center',
    width: window.width - 30,
    marginHorizontal: 10,
    marginTop: 10
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
