import { connect } from 'react-redux';
import FacebookLogin from './login';
import { receiveCurrentUser } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: currentUser => dispatch(receiveCurrentUser(currentUser))
});

export default connect(null, mapDispatchToProps)(FacebookLogin);
