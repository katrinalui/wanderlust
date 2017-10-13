import { connect } from 'react-redux';
import Chat from './chat';

const mapStateToProps = state => ({
  currentUser: state.ui.session.currentUser

});


export default connect(null, null)(Chat);
