import { connect } from 'react-redux';
import { receiveSingleTrip } from '../../actions/trip_actions';
import NewTripForm from './new_trip_form';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveSingleTrip: trip => dispatch(receiveSingleTrip(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTripForm);
