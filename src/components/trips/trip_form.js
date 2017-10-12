import React from 'react';
import { TextInput,
         View,
         Text,
         Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

class TripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: ''
    };
  }

  handleChange(value, inputType) {
    this.setState({ [inputType]: value });
  }

  render() {
    console.log('state!!!', this.state);
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
          minDate={ new Date }
          />
      </View>
    );
  }
}

export default TripForm;
