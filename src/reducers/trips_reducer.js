import {RECEIVE_ALL_TRIPS,
        RECEIVE_SINGLE_TRIP,
        REMOVE_TRIP} from '../actions/trip_actions';

const TripsReducer = (state = {}, action) => {
  Object.freeze(state);
  const receivedTrip = action.trip;
  switch (action.type) {
    case RECEIVE_ALL_TRIPS:
      return action.trips;
    case RECEIVE_SINGLE_TRIP:
      return Object.assign({}, state, { [receivedTrip.id]:receivedTrip});
    case REMOVE_TRIP:
      const newState = Object.assign({}, state);
      delete newState[receivedTrip.id];
      return newState;
    default:
      return state;
  }
};

export default TripsReducer;
