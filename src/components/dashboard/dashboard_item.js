import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Dimensions, View, Text, Button } from 'react-native';
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
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handleEditButton() {
    this.props.navigation.navigate('EditTripForm', { id: this.props.id });
  }

  handleDeleteButton() {
    deleteTrip(this.props.id);
  }

  handlePress() {
    this.props.navigation.navigate('Chat', { id: this.props.id });
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
        <View style={{
          borderBottomColor: 'black',
          borderBottomWidth: 2
        }}>
          <Text style={ style }
                onPress={this.handlePress}>
            {this.props.title}
          </Text>
        </View>
      </Swipeout>
    );
  }
}

export default DashboardItem;
