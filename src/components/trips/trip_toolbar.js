import React from 'react';
import { Toolbar } from 'react-native-material-ui';

const TripToolbar = props => {
  const { type, tripID, title, navigation } = props;

  // default is for chat screen
  let icon = "map";
  let redirect = "TripMap";

  // change from default
  if (type === "map") {
    icon = "chat";
    redirect = "Chat";
  }

  return (
    <Toolbar
      leftElement="menu"
      centerElement={title}
      rightElement={icon}
      onRightElementPress={() => navigation.navigate(redirect, { id: tripID })}
    />
  );
};

export default TripToolbar;
