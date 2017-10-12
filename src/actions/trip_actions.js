import { postTrip, deleteTrip } from '../util/trip_api_util';

export const RECEIVE_ALL_TRIPS = "RECEIVE_ALL_TRIPS";
export const RECEIVE_SINGLE_TRIP = "RECEIVE_SINGLE_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";

export const receiveAllTrips = (trips) => ({
  type: RECEIVE_ALL_TRIPS,
  trips
});

export const receiveSingleTrip = (trip) => ({
  type: RECEIVE_SINGLE_TRIP,
  trip
});

export const removeTrip = (trip) => ({
  type: REMOVE_TRIP,
  trip
});

export const createTrip = (trip, userID) => dispatch => (
  postTrip(trip, userID).then(trip => dispatch(receiveSingleTrip(trip.val())))
);

export const destroyTrip = (tripID) => dispatch => (
  deleteTrip(tripID)
);
