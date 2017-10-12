import React from 'react';
import { TextInput,
         View,
         Text,
         Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';

class NewTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: ''
    };
    this.handlePress = this.handlePress.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  handleChange(value, inputType) {
    this.setState({ [inputType]: value });
  }

  redirectToDashboard() {
    this.props.navigation.navigate('Dashboard');
  }

  handlePress() {
    const userID = this.props.currentUser.id;
    this.props.createTrip(this.state, userID);
  }

  render() {
    return (
      <View>
        <Text>Create My Trip</Text>

        <Text>Title</Text>
          <TextInput placeholder="Add Title"
                     onChangeText={text => this.handleChange(text, 'title')}/>
        <Text>Start Date</Text>

        <DatePicker
          style={{width: 200}}
          date={ this.state.startDate }
          placeholder="Select Start Date"
          format='YYYY-MM-DD'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={ (date) => this.handleChange(date, 'startDate') }
          minDate={ new Date }
          />

        <Text>End Date</Text>
        <DatePicker
          style={{width: 200}}
          date={ this.state.endDate }
          placeholder="Select End Date"
          format='YYYY-MM-DD'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={ (date) => this.handleChange(date, 'endDate') }
          minDate={ this.state.startDate || new Date }
          />

        <Button title='Create!'
                onPress={ this.handlePress }/>

        <Button title='Dashboard'
                onPress={ this.redirectToDashboard }/>
      </View>
    );
  }
}

export default NewTripForm;
