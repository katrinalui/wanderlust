import React from 'react';
import { View, Text, Image } from 'react-native';

const Message = (props) => {
  const { author, image, body } = props.message.item;
  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{uri: image }} style={{height: 40, width: 40, borderRadius: 40/2}}/>
        <View style={{marginVertical: 15, marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{ author }</Text>
          <Text>{ body }</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;
