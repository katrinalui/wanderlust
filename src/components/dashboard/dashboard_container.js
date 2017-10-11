import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { receiveAllTrips } from '../../actions/trip_actions';

const mapStateToProps = state => ({
  trips: state.entities.trips,
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveAllTrips: trips => dispatch(receiveAllTrips(trips))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
