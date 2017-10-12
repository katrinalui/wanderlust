import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Dimensions, View, Text } from 'react-native';
import { deleteTrip } from '../../util/trip_api_util';

const { width } = Dimensions.get('window');
const style = {
  width,
  height: 60,
  fontSize: 24,
};

class DashboardItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  handleEditButton() {
    console.log('inside edit!', this.props);
  }

  handleDeleteButton() {
    deleteTrip(this.props.id);
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
            {this.props.title}
          </Text>
        </View>
      </Swipeout>
    );
  }
}

export default DashboardItem;
