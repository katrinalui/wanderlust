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
