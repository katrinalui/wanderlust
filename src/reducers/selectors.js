export const selectUserTrips = state => {
  const currentUser = state.ui.session.currentUser;
  if (currentUser) {
    return Object.values(currentUser.trips);
  } else {
    return [];
  }
};
