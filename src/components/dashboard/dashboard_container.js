import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { receiveAllTrips, destroyTrip } from '../../actions/trip_actions';
import { selectUserTrips } from '../../reducers/selectors';

const mapStateToProps = state => ({
  trips: selectUserTrips(state),
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  // receiveAllTrips: trips => dispatch(receiveAllTrips(trips))
  // destroyTrip: tripID => dispatch(destroyTrip(tripID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
