import React from 'react';
import { View, Text, Image } from 'react-native';

const Message = (props) => {
  const { author, image, body } = props.message.item;
  console.log(props);
  return (
    <View>
      <View>
          <Text>{ author }</Text>
          <Image source={{uri: image }} />
      </View>
      <Text>{ body }</Text>
  </View>
  );
};

export default Message;
