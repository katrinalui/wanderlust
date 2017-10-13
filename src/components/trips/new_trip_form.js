import React from 'react';
import { TextInput,
         View,
         Text,
         Button,
         FlatList } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';

class NewTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
    this.postToFirebase = this.postToFirebase.bind(this);
  }

  handleChange(value, inputType) {
    this.setState({ [inputType]: value });
  }

  redirectToDashboard() {
    this.props.navigation.navigate('Dashboard');
  }

  handleSubmit() {
    let errors = [];
    if (!this.state.title) errors.push('You need a title!');
    if (!this.state.startDate) errors.push('When is the start date?');
    if (!this.state.endDate) errors.push('When is the end date?');

    if (this.state.endDate && this.state.startDate) {
      if (new Date(this.state.endDate) - new Date(this.state.startDate) < 0) {
        errors.push('Start date must be after end date');
      }
    }
    this.setState({ errors }, () => {
      if (this.state.errors.length === 0) {
        console.log(this.state.errors.length);
        this.postToFirebase();
      }
    });

  }

  postToFirebase() {
    const userID = this.props.currentUser.id;
    this.setState({ title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate }, () =>
      this.props.createTrip(this.state, userID));
  }

  render() {
    const errors = this.state.errors.map((el, i) => { return { [i]: el }; });

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
          minDate={ new Date } />

        <Text>End Date</Text>
        <DatePicker
          style={{width: 200}}
          date={ this.state.endDate }
          placeholder="Select End Date"
          format='YYYY-MM-DD'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={ (date) => this.handleChange(date, 'endDate') }
          minDate={ this.state.startDate || new Date } />

        <Button title='Create'
                onPress={ this.handleSubmit } />

        <FlatList data={ errors }
                  keyExtractor={item => Object.keys(item)[0]}
                  renderItem={ ({ item }) => <Text>{ Object.values(item)[0] }</Text>} />

        <Button title='Dashboard'
                onPress={ this.redirectToDashboard } />
      </View>
    );
  }
}

export default NewTripForm;
