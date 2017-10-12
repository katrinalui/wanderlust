import { connect } from 'react-redux';
import { receiveSingleTrip } from '../../actions/trip_actions';
import TripForm from './trip_form';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});
const mapDispatchToProps = dispatch => ({
  receiveSingleTrip: trip => dispatch(receiveSingleTrip(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripForm);
