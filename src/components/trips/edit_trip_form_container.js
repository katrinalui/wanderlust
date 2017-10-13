import { connect } from 'react-redux';
import { editTrip } from '../../actions/trip_actions';
import EditTripForm from './edit_trip_form';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  editTrip: (trip) => dispatch(editTrip(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTripForm);

// Maybe make another UI reducer for tripViewId but then we
// need to have our trips entity have all of the trips or else what's the
// point?
