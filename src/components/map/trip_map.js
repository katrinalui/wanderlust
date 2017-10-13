import React from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

import * as firebase from 'firebase';

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
    this.tripID = this.props.navigation.state.params.id;
    this.state = { region: initialRegion,
                   markers: [] };
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    const markersRed = firebase.database()
                               .ref(`/markers/${this.tripID}`);
    markersRed.on('child_added', snap => this.setState(prevState => {
      console.log('inside snap');
      return { markers: prevState.markers.concat([snap.val()])};
    }));
  }

  render() {
    return (
      <View>
        <MapView
          onLongPress = { (e) => this.handlePress(e) }
          style={ { height, width } }
          initialRegion={ this.state.region } >
          { this.state.markers.map(marker => (
            <MapView.Marker coordinate={ marker.latlng }/>
          ))}
        </MapView>
      </View>
    );
  }

  handlePress(e) {
    console.log(e.nativeEvent.coordinate);
    this.props.postMarker(e.nativeEvent.coordinate, this.tripID);
  }


}

export default TripMap;
