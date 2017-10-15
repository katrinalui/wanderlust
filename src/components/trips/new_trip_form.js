import React from 'react';
import { TextInput,
         View,
         Text,
         Button,
         FlatList,
         Share,
         Modal,
         StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import FloatLabelTextField from '../form/float_label_text_field';
import * as firebase from 'firebase';

class NewTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      errors: [],
      modalVisible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postToFirebase = this.postToFirebase.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);
  }

  _shareTextMessage () {
    Share.share({
      message: `Join my trip plans at Wanderlust. Copy and paste the following code: ${this.tripID}`,
      url: 'http://google.com'
    })
    .then(this._showResult)
    .catch(err => console.log(err));
  }

  _showResult (result) {
     console.log(result);
   }

   _setModalVisible(visible) {
     this.setState({modalVisible: visible});
   }

  handleChange(value, inputType) {
    this.setState({ [inputType]: value });
  }

  handleSubmit() {
    let errors = [];
    if (!this.state.title) errors.push('Title cannot be blank.');
    if (!this.state.startDate) errors.push('Start date cannot be blank.');
    if (!this.state.endDate) errors.push('End date cannot be blank.');

    if (this.state.endDate && this.state.startDate) {
      if (new Date(this.state.endDate) - new Date(this.state.startDate) < 0) {
        errors.push('Start date cannot be after end date.');
      }
    }
    this.setState({ errors }, () => {
      if (this.state.errors.length === 0) {
        this.postToFirebase();
      }
    });
  }

  postToFirebase() {
    const userID = this.props.currentUser.id;
    this.setState({ title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate }, () =>
        this.props.createTrip(this.state, userID)
                  .then(res => {
                    this.tripID = res.trip.id;
                    this.setState({ modalVisible: true });
                }));
  }

  redirectToTrip() {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate("Chat", { id: this.tripID });
  }

  render() {
    const errors = this.state.errors.map((el, i) => { return { [i]: el }; });

    return (
      <View style={ styles.container }>
        <Text>Create a Trip</Text>

        <FloatLabelTextField
          placeholder="Title"
          value={this.state.title}
          maxLength={50}
          onChangeTextValue={text => this.handleChange(text, 'title')}
        />

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

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={ styles.modalContainer }>
            <View style={ styles.innerModalContainer }>
              <Text>Your trip has been created!</Text>
              <Button
                onPress={this._shareTextMessage.bind(this)}
                title="Invite your friends" />

              <Button
                onPress={this.redirectToTrip.bind(this)}
                title="Continue" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerModalContainer: {
    width: 200,
    height: 150,
    alignItems: 'center'
  }
});

export default NewTripForm;
