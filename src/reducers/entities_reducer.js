import { combineReducers } from 'redux';
import TripsReducer from './trips_reducer';
import MessagesReducer from './messages_reducer';
import MarkersReducer from './markers_reducer';

const EntitiesReducer = combineReducers({
  trips: TripsReducer,
  messages: MessagesReducer,
  markers: MarkersReducer
});

export default EntitiesReducer;
