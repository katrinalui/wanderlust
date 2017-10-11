import { connect } from 'react-redux';
import TripMap from './trip_map';

const mapStateToProps = (state) => ({
  // markers: state.markers
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TripMap);
