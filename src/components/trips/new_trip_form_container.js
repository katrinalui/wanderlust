import { connect } from 'react-redux';
import { createTrip } from '../../actions/trip_actions';
import NewTripForm from './new_trip_form';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createTrip: (trip, userID) => dispatch(createTrip(trip, userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTripForm);
