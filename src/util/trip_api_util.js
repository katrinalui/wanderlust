import * as firebase from 'firebase';

export const postTrip = (trip, userID) => {
  const tripRef = firebase.database().ref('/trips').push();
  const key = tripRef.key;
  const newTrip = {
    id: key,
    title: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    ownerID: userID
  };

  const userTripsRef = firebase.database()
                               .ref(`/users/${userID}/trips/${ key }`);

  userTripsRef.set(newTrip.title);
  return tripRef.set(newTrip)
    .then(() => tripRef.once('value', snap => { return snap; }));
};

export const deleteTrip = tripID => {
  const tripRef = firebase.database().ref(`/trips/${tripID}`);
  tripRef.once('value', snap => {
    const trip = snap.val();
    const ownerID = trip.ownerID;
    const members = trip.members;

    tripRef.remove();
    firebase.database().ref(`/users/${ownerID}/trips/${tripID}`).remove();
    // add code to remove trip from each member
  });
};
