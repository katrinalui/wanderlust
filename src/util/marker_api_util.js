import * as firebase from 'firebase';

export const postMarker = (coordinate, tripID) => {
  const markerRef = firebase.database().ref(`/markers/${tripID}`).push();
  const key = markerRef.key;
  const newMarker = {
    id: key,
    latlng: {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    }
  };

  return markerRef.set(newMarker)
                  .then(() => markerRef
                  .once('value', snap => { return snap; }));
};
