import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { Screen, Title } from '@shoutem/ui';

class Chat extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     messages: [],
  //   };
  // }
  //
  // componentDidMount() {
  //
  // }

  render() {
    return (
      <Screen>
        <Title>trip name...</Title>
        <KeyboardAvoidingView/>
        <Mess
      </Screen>
    );
  }
}

// <GiftedChat
//   messages={this.state.messages}
//   onSend={(messages) => this.onSend(messages)}
//   placeholder="Start Typing..."/>
export default Chat;
