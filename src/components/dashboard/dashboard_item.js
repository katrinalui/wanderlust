import React from 'react';
import Swipeout from 'react-native-swipeout';
import { Dimensions, View, Text, Share, Button, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import { deleteTrip } from '../../util/trip_api_util';

const { width } = Dimensions.get('window');

class DashboardItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this._shareTextMessage = this._shareTextMessage.bind(this);
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

  _shareTextMessage () {
    Share.share({
      message: `Join my trip plans at Wanderlust. Copy and paste the following code: ${this.props.id}`,
      url: 'http://google.com'
    })
    .then(this._showResult)
    .catch(err => console.log(err));
  }

  _showResult (result) {
     console.log(result);
   }

  render() {
    const swipeoutBtns = [
      {
        text: 'Share',
        backgroundColor: '#00A9A5',
        onPress: this._shareTextMessage
      },
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
        <ListItem
          divider
          centerElement={this.props.title}
          onPress={this.handlePress}
          style={styles}
        />

      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#253058'
  },
  centerElementContainer: {
    justifyContent: 'center'
  },
  primaryText: {
    fontSize: 18,
    color: 'white',
    fontWeight: "300"
  }
});

export default DashboardItem;
