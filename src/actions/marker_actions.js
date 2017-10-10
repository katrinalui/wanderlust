export const RECEIVE_ALL_MARKERS = "RECEIVE_ALL_MARKERS";
export const RECEIVE_SINGLE_MARKER = "RECEIVE_SINGLE_MARKER";
export const REMOVE_MARKER = "REMOVE_MARKER";

export const receiveAllMarkers = (markers) => ({
  type: RECEIVE_ALL_MARKERS,
  markers
});

export const receiveSingleMarker = (marker) => ({
  type: RECEIVE_SINGLE_MARKER,
  marker
});

export const removeMarker = (marker) => ({
  type: REMOVE_MARKER,
  marker
});
