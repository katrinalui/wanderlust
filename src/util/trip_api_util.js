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

export const updateTrip = (trip) => {
  console.log('inside util', trip);

  const tripRef = firebase.database().ref(`/trips/${trip.id}`);
  const editedTrip = {
    id: trip.id,
    title: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    ownerID: trip.ownerID
  };

  let memberTripsRef;
  if (trip.members) {
    Object.keys(trip.members).forEach(memberID => {
      memberTripsRef = firebase.database().ref(`/users/${memberID}/trips/${ trip.id }`);
      memberTripsRef.set(editedTrip.title);
    });
    
    editedTrip['members'] = trip.members;
  }

  var updates = {};
  updates['/trips/' + trip.id] = editedTrip;

  firebase.database().ref().update(updates);

  const userTripsRef = firebase.database()
                               .ref(`/users/${trip.ownerID}/trips/${ trip.id }`);
  //
  userTripsRef.set(editedTrip.title);
  //
  // return tripRef.set(editedTrip)
  //   .then(() => tripRef.once('value', snap => { return snap; }));
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
