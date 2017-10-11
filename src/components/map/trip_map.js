import React from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const { width, height } = Dimensions.get('window');

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { region: initialRegion};
  }

  render() {
    return (
      <View>
        <MapView
          style={ { height, width } }
          initialRegion={ this.state.region } />
      </View>
    );
  }


}

export default TripMap;
