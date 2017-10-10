import {RECEIVE_ALL_MARKERS,
        RECEIVE_SINGLE_MARKER,
        REMOVE_MARKER} from '../actions/marker_actions';

const MarkersReducer = (state = {}, action) => {
  Object.freeze(state);
  const receivedMarker = action.marker;
  switch (action.type) {
    case RECEIVE_ALL_MARKERS:
      return action.markers;
    case RECEIVE_SINGLE_MARKER:
      return Object.assign({}, state, { [receivedMarker.id]:receivedMarker});
    case REMOVE_MARKER:
      const newState = Object.assign({}, state);
      delete newState[receivedMarker.id];
      return newState;
    default:
      return state;
  }
};

export default MarkersReducer;
