import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import * as firebase from 'firebase';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(text) {
    this.setState({ body: text });
  }

  handleSubmit() {
    this.props.postMessage(this.state,
                           this.props.currentUser,
                           this.props.navigation.state.params.id);
  }

  render() {
    console.log(this.state);
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>

        <TextInput placeholder="Text here..."
                   onChangeText={(text) => this.handleChange(text)}/>
                 <Button title='Submit'
                          onPress={this.handleSubmit}/>
      </View>
    );
  }
}

export default Chat;
