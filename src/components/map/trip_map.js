import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  Modal,
  TouchableHighlight,
  TextInput,
  Picker
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
                   },
                   modalVisible: false,
                   marker: {
                     title: '',
                     day: '1',
                     longitude: null,
                     latitude: null
                   },
                   days: 0
                 };
    this.handleMapPress = this.handleMapPress.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleMarkerTitleInput = this.handleMarkerTitleInput.bind(this);
    this.handleMarkerDayInput = this.handleMarkerDayInput.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  componentWillMount() {
    let days;
    const markersRef= firebase.database()
                              .ref(`/markers/${this.tripID}`);

    const tripRef = firebase.database()
                            .ref(`/trips/${this.tripID}`);

    tripRef.once('value', tripSnap => {

             const { startDate, endDate } = tripSnap.val();
             days = this.daysDiff(new Date(startDate), new Date(endDate));
             return tripSnap;
           })
           .then(res => {
             markersRef.on('value', markerSnap => {
               console.log('markerSnap', markerSnap.val());
               if (markerSnap.val()) {
                 this.setState({ markers: Object.values(markerSnap.val()),
                                days});
               } else {
                this.setState({ markers: [],
                                days});
            }
          });
        }
      );
  }

  daysDiff(startDateObj, endDateObj) {
    const ms = endDateObj.getTime() - startDateObj.getTime();
    return ms / 1000 / 60 / 60 / 24 + 1;
  }

  render() {
    let pickerArray = [];
    for (var i = 1; i < (this.state.days + 1); i++) {
      pickerArray.push(<Picker.Item label={ i.toString() } value={ i.toString() } />);
    }

    return (
      <View>
        <TripToolbar
          type="map"
          tripID={this.tripID}
          title={this.props.navigation.state.params.title}
          navigation={this.props.navigation} />

        <GooglePlacesAutocomplete placeholder='Search...'
                                  minLength={ 2 }
                                  autoFocus={ false }
                                  returnKeyType={ 'search' }
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
                                    const { lat, lng } = details.geometry.location;
                                    this.setState({
                                      region: {
                                        latitude: lat,
                                        longitude: lng,
                                        latitudeDelta: this.state.region.latitudeDelta,
                                        longitudeDelta: this.state.region.longitudeDelta
                                      }
                                    });
                                  }}

                                  renderDescription={(row) => {
                                    return row.description;
                                    }}

                                  styles={{
                                    container: {
                                      zIndex: 100
                                    },
                                    textInputContainer: {
                                      position: 'relative',
                                      width: '100%',
                                      backgroundColor: '#1f2b4b'
                                    },
                                    description: {
                                      fontWeight: 'bold'
                                    },
                                    predefinedPlacesDescription: {
                                      color: 'black'
                                    },
                                    listView: {
                                      position: 'absolute',
                                      top: 43,
                                      backgroundColor: 'white'
                                    }
                                  }}
                                  nearbyPlacesAPI='GooglePlacesSearch'
                                  debounce={ 1000 }
                                  />

        <MapView
          onLongPress={ this.handleMapPress }
          style={ { height, width } }
          region={ this.state.region }
          onRegionChangeComplete={ this.handleRegionChange }
          onRegionChange={ this.handleRegionChange }>
          { this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={ marker.latlng }
              onPress={ this.handleMarkerPress }
              pinColor='#00007f'>
              <MapView.Callout tooltip={ false }>
                <View>
                  <Text>{ marker.title }</Text>
                  <Text>{ marker.day }</Text>
                  <Button title='Delete?'
                    onPress={ (e) => this.handleDelete(e, marker.id) }/>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>


        <Modal
          animationType="slide"
          transparent={ true }
          visible={ this.state.modalVisible } >

            <View style={
                { marginTop: height - 200,
                  width,
                  backgroundColor: 'white',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'}
                } >
              <View>
                <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' } }>
                  <Text style={ { fontSize: 16, paddingRight: 20 } }>Marker Title</Text>
                  <TextInput style={ { width: 200 } }
                             placeholder='Title...'
                             onChange={ this.handleMarkerTitleInput } />
                </View>

                <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
                  <Text style={ { fontSize: 16 } }>Which day will you be going?</Text>
                  <Picker style={ {height: 100, width } }
                    itemStyle={ { height: 100, fontSize: 12 } }
                    selectedValue={ this.state.marker.day }
                    onValueChange={ this.handleMarkerDayInput } >
                    { pickerArray }
                  </Picker>
                </View>

                <Button title='Submit'
                        onPress={ this.handleModalSubmit } />

                <TouchableHighlight onPress={ this.handleModalClose } >
                  <Text>Close</Text>
                </TouchableHighlight>
              </View>
         </View>

        </Modal>

      </View>
    );
  }

  handleModalSubmit () {
    this.props.postMarker(this.state.marker, this.tripID);
    this.handleModalClose();
  }

  handleModalClose() {
    this.setState({
      modalVisible: false,
      marker: {
        title: '',
        day: '1',
        longitude: null,
        latitude: null
      }
    });
  }

  handleRegionChange(e) {
    this.setState({ region: e });
  }

  handleMarkerTitleInput(e) {
    this.setState({
      marker: {
        title: e.nativeEvent.text,
        day: this.state.marker.day,
        longitude: this.state.marker.longitude,
        latitude: this.state.marker.latitude
      }
    });
  }

  handleMarkerDayInput(day) {
    this.setState({
      marker: {
        title: this.state.marker.title,
        day,
        longitude: this.state.marker.longitude,
        latitude: this.state.marker.latitude
      }
    });
  }

  handleMapPress(e) {
    this.setState({ modalVisible: true,
                    marker: {
                      title: this.state.marker.title,
                      day: this.state.marker.day,
                      longitude: e.nativeEvent.coordinate.longitude,
                      latitude: e.nativeEvent.coordinate.latitude
                    }
                  });
  }

  handleDelete(e, markerID) {
    const markerRef = firebase.database()
                              .ref(`/markers/${this.tripID}/${markerID}`)
                              .remove();
  }

}

export default TripMap;


// <TripToolbar
//   type="map"
//   tripID={this.tripID}
//   title={this.props.navigation.state.params.title}
//   navigation={this.props.navigation} />
