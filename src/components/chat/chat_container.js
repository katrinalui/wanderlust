import { connect } from 'react-redux';
import Chat from './chat';
import { postMessage } from '../../util/chat_api_util';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  postMessage: (message, currentUser, tripID) => postMessage(message, currentUser, tripID)
});


export default connect(mapStateToProps, mapDispatchToProps)(Chat);
