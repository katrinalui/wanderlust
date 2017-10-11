import React from 'react';
import {
  View,
  Text
} from 'react-native';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text>
           Your current trips!
        </Text>


      </View>
    );
  }
}

export default Dashboard;
