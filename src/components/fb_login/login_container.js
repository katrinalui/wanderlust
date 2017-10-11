import { connect } from 'react-redux';
import FacebookLogin from './login';
import { receiveCurrentUser } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});
const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: currentUser => dispatch(receiveCurrentUser(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin);
