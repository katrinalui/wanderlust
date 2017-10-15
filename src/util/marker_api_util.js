import * as firebase from 'firebase';

export const postMarker = (marker, tripID) => {
  const markerRef = firebase.database().ref(`/markers/${tripID}`).push();
  const key = markerRef.key;
  const newMarker = {
    id: key,
    title: marker.title,
    day: marker.day,
    latlng: {
      latitude: marker.latitude,
      longitude: marker.longitude
    }
  };

  return markerRef.set(newMarker)
                  .then(() => markerRef
                  .once('value', snap => { return snap; }));
};
