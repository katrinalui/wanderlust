export const selectUserTrips = state => {
  const currentUser = state.ui.session.currentUser;
  if (currentUser && currentUser.trips) {
    return Object.keys(currentUser.trips).map(id => { return {[id]: currentUser.trips[id] };});
  } else {
    return [];
  }
};
