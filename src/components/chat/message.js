import React from 'react';
import { View, Text, Image } from 'react-native';

const Message = (props) => {
  const { author, image, body } = props.message.item;
  console.log(props);
  return (
    <View>
      <View>
          <Text>{ author }</Text>
          <Image source={{uri: image }} style={{height: 40, width: 40, borderRadius: 40/2}}/>
      </View>
      <Text>{ body }</Text>
  </View>
  );
};

export default Message;
