import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Picker,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet
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
                     latitude: 21.21092611286193,
                     longitude: -33.45021902507677,
                     latitudeDelta: 141.6785003679752,
                     longitudeDelta: 131.744584745511
                   },
                   modalVisible: false,
                   modalMargin: height - 250,
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
    this.handleModalOutsideClick = this.handleModalOutsideClick.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.handleMarkerPress = this.handleMarkerPress.bind(this);
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

    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow',
                                   () => this.setState({modalMargin: height - 350}));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide',
                                   () => this.setState({modalMargin: height - 250}));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  daysDiff(startDateObj, endDateObj) {
    const ms = endDateObj.getTime() - startDateObj.getTime();
    return ms / 1000 / 60 / 60 / 24 + 1;
  }

  render() {
    let pickerArray = [];
    for (var i = 1; i < (this.state.days + 1); i++) {
      pickerArray.push(<Picker.Item key={ i.toString() } label={ i.toString() } value={ i.toString() } />);
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
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
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
            onPress={ Keyboard.dismiss }
            style={ { height, width } }
            region={ this.state.region }
            onRegionChangeComplete={ this.handleRegionChange }
            onRegionChange={ this.handleRegionChange }>
            { this.state.markers.map(marker => (
              <MapView.Marker
                coordinate={ marker.latlng }
                onPress={ this.handleMarkerPress }
                pinColor='#00007f'
                key={ marker.id }>
                <MapView.Callout tooltip={ false }>
                  <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', width: 120 } }>
                    <View style={ { paddingBottom: 5 } }>
                      <Text style={ { fontWeight: 'bold' } }>Notes:</Text>
                    </View>
                    <View style={ { paddingBottom: 5 } }>
                      <Text>{ marker.title }</Text>
                    </View>
                    <Text style={ { paddingBottom: 5 } } >Day { marker.day }</Text>
                    <TouchableOpacity onPress={ e => this.handleDelete(e, marker.id) }>
                      <Text style={ { fontSize: 14, color: 'red' } }>Delete?</Text>
                    </TouchableOpacity>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>

          <Modal
            animationType="slide"
            transparent={ true }
            visible={ this.state.modalVisible }
          >
            <TouchableWithoutFeedback onPress={ this.handleModalOutsideClick }
                                      style={{ flex: 1 }}>
              <KeyboardAvoidingView
                behavior="padding"
                pointerEvents="box-none"
                style={{ flex: 1, justifyContent: 'flex-end', transform: [{ translateY: 0 }] }}
              >
                <View style={
                  {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end'}
                  }>
                  <View style={{
                    marginTop: this.state.modalMargin,
                    width,
                    backgroundColor: 'white',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <View style={ { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 } }>
                      <Text style={ { fontSize: 14, paddingRight: 25, fontWeight:'bold' } }>Notes:</Text>
                      <TextInput style={ { width: width - 220, fontSize: 12 } }
                        placeholder='(optional)'
                        onChange={ this.handleMarkerTitleInput } />
                    </View>

                    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 15 } }>
                      <Text style={ { fontSize: 14 , fontWeight: 'bold' } }>Which day will you be going?</Text>
                      <Picker style={ {height: 100, width } }
                        itemStyle={ { height: 100, fontSize: 14 } }
                        selectedValue={ this.state.marker.day }
                        onValueChange={ this.handleMarkerDayInput } >
                        { pickerArray }
                      </Picker>
                    </View>

                    <TouchableOpacity onPress={ this.handleModalSubmit }>
                      <Text style={ { color: 'green' , paddingBottom: 20, fontWeight: 'bold' } }>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ this.handleModalClose } >
                      <Text style={ { fontWeight: 'bold', paddingBottom: 20 } }>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
    );
  }

  handleMarkerPress(e) {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const { latitudeDelta, longitudeDelta } = this.state.region;
    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      }
    });
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

  handleModalOutsideClick() {
    Keyboard.dismiss();
    if (!this.state.marker.title) this.handleModalClose();
  }

  handleRegionChange(coordinates) {
    this.setState({ region: coordinates });
  }

  handleMarkerTitleInput(e) {
    const { day, longitude, latitude } = this.state.marker;
    const title = e.nativeEvent.text;
    this.setStateForMarker(title, day, latitude, longitude);
  }

  handleMarkerDayInput(day) {
    const { title, longitude, latitude } = this.state.marker;
    this.setStateForMarker(title, day, latitude, longitude);
  }

  setStateForMarker(title, day, latitude, longitude) {
    this.setState({
      marker: {
        title,
        day,
        latitude,
        longitude
      }
    });
  }

  handleMapPress(e) {
    const { title, day } = this.state.marker;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const { latitudeDelta, longitudeDelta } = this.state.region;
    this.setState({ modalVisible: true,
                    marker: {
                      title,
                      day,
                      longitude,
                      latitude
                    },
                    region: {
                      longitude,
                      latitude,
                      longitudeDelta,
                      latitudeDelta
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
