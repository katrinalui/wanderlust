import { connect } from 'react-redux';
import TripMap from './trip_map';
import { postMarker } from '../../util/marker_api_util';

const mapStateToProps = (state) => ({
  // markers: state.markers
});

const mapDispatchToProps = (dispatch) => ({
  postMarker: (marker, tripID) => postMarker(marker, tripID)
});

export default connect(mapStateToProps, mapDispatchToProps)(TripMap);
