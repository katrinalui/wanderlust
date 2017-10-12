import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Dimensions, View, Text } from 'react-native';


const { width } = Dimensions.get('window');
const style = {
  width,
  height: 60,
  fontSize: 24,
};

class DashboardItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('props inside item', props);
  }

  handleEditButton() {
    console.log('inside edit!');
  }

  handleDeleteButton() {
    console.log('inside delete!');
  }

  render() {
    const swipeoutBtns = [
      {
        text: 'Edit',
        backgroundColor: 'orange',
        onPress: this.handleEditButton
      },
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: this.handleDeleteButton }
      ];

    return (
      <Swipeout right={swipeoutBtns}>
        <View>
          <Text style={ style }>
            Spain 2017
          </Text>
        </View>
      </Swipeout>
    );
  }
}

export default DashboardItem;
