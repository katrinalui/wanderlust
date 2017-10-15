import React from 'react';
import { Toolbar } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      style={{ container: { paddingTop: 35, paddingBottom: 20, height: 65 } }}
      leftElement="home"
      onLeftElementPress={() => navigation.navigate("Dashboard")}
      centerElement={title}
      rightElement={icon}
      onRightElementPress={() => navigation.navigate(redirect, { id: tripID, title: title })}
    />
  );
};

export default TripToolbar;
