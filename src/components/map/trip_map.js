import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button
} from 'react-native';

import MapView from 'react-native-maps';
import TripToolbar from '../trips/trip_toolbar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as firebase from 'firebase';

const { width, height } = Dimensions.get('window');
class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.tripID = this.props.navigation.state.params.id;
    this.state = { markers: [],
                   region: {
                     latitude: 37.78825,
                     longitude: -122.4324,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421
                   }};
    this.handleMapPress = this.handleMapPress.bind(this);
  }

  componentWillMount() {
    const markersRef= firebase.database()
                               .ref(`/markers/${this.tripID}`);

    markersRef.on('value', snap => {
      if (snap.val()) {
        this.setState({ markers: Object.values(snap.val())});
      }
    });
  }

  render() {
    return (
      <View>

        <GooglePlacesAutocomplete placeholder='Search'
                                  minLength={ 2 }
                                  autoFocus={ false }
                                  returnKeyType={'search'}
                                  listViewDisplayed={ 'auto' }
                                  fetchDetails={ true }
                                  getDefaultValue={() => {
                                    return '';
                                  }}

                                  query={{
                                    key: 'AIzaSyBJum-YS-ekRtpyH4f5N1uiUsRv7yBxb5s',
                                    language: 'en'
                                  }}

                                  onPress={(data, details = null) => {
                                    const { lat, lng } = details.geometry.location
                                    console.log('state inside onPress', this.state);
                                    this.setState({
                                      region: {
                                        latitude: lat,
                                        longitude: lng,
                                        latitudeDelta: this.state.region.latitudeDelta,
                                        longitudeDelta: this.state.region.longitudeDelta
                                      }
                                    })
                                  }}

                                  renderDescription={(row) => {
                                    return row.description;
                                    }}

                                  styles={{
                                    container: {
                                      zIndex: 100,
                                      paddingTop: 25
                                    },
                                    textInputContainer: {
                                      position: 'relative',
                                      width: '100%'
                                    },
                                    description: {
                                      fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                      color: 'black'
                                    },
                                    listView: {
                                      position: 'absolute',
                                      top: 69,
                                      backgroundColor: 'white'
                                    }
                                  }}
                                  nearbyPlacesAPI='GooglePlacesSearch'
                                  debounce={ 1000 } />

        <MapView
          onLongPress={ (e) => this.handleMapPress(e) }
          style={ { height, width } }
          region={ this.state.region }
          onRegionChange = { (e) => this.handleRegionChange(e) }>
          { this.state.markers.map(marker => (
            <MapView.Marker draggable
              coordinate={ marker.latlng }
              onPress={ this.handleMarkerPress }
              pinColor='#00007f'>

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

  handleRegionChange(e) {
    this.setState({ region: e });
  }

  handleMapPress(e) {
    this.props.postMarker(e.nativeEvent.coordinate, this.tripID);
  }

  handleDelete(e, markerID) {
    const markerRef = firebase.database().ref(`/markers/${this.tripID}/${markerID}`);
    markerRef.remove();
  }

}

export default TripMap;


// <TripToolbar
//   type="map"
//   tripID={this.tripID}
//   title={this.props.navigation.state.params.title}
//   navigation={this.props.navigation} />
