import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';

import * as firebase from 'firebase';
import Message from './message';

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

  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FlatList
            keyExtractor={item => item.id}
            data={this.state.messages}
            renderItem={item => <Message message={item} />}
          />

            <TextInput placeholder="Text here..."
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
