import { connect } from 'react-redux';
import { receiveCurrentUser } from '../../actions/session_actions';
import Splash from './splash';

const mapDispatchToProps = dispatch => ({
  receiveCurrentUser: currentUser => dispatch(receiveCurrentUser(currentUser))
});

export default connect(null, mapDispatchToProps)(Splash);
