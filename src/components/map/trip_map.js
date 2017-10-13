import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button
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
    this.handleMapPress = this.handleMapPress.bind(this);
  }

  componentWillMount() {
    const markersRef= firebase.database()
                               .ref(`/markers/${this.tripID}`);

    markersRef.on('value', snap => {
      this.setState({ markers: Object.values(snap.val())});
    });
  }

  render() {
    return (
      <View>
        <MapView
          onLongPress={ (e) => this.handleMapPress(e) }
          style={ { height, width } }
          initialRegion={ this.state.region } >
          { this.state.markers.map(marker => (
            <MapView.Marker coordinate={ marker.latlng }
                            onPress={ this.handleMarkerPress }>

              <MapView.Callout tooltip={ false }>
                <View>
                  <Button title='Delete?'
                          onPress={ (e) => this.handleDelete(e, marker.id) }/>
                </View>

              </MapView.Callout>


            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }

  handleMapPress(e) {
    console.log(e.nativeEvent.coordinate);
    this.props.postMarker(e.nativeEvent.coordinate, this.tripID);
  }

  handleDelete(e, markerID) {
    console.log(markerID);
    const markerRef = firebase.database().ref(`/markers/${this.tripID}/${markerID}`);
    markerRef.remove();
  }


}

export default TripMap;
