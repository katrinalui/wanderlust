import React from 'react';
import { TextInput,
         View,
         Text,
         Button,
         FlatList,
         Share,
         Modal,
         Keyboard,
         TouchableWithoutFeedback,
         StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import FloatLabelTextField from '../form/float_label_text_field';
import FloatLabelDatePicker from '../form/float_label_datepicker';
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
        <Toolbar
          style={{ container: { paddingTop: 45, height: 90 } }}
          leftElement="chevron-left"
          onLeftElementPress={() => this.props.navigation.navigate("Dashboard")}
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create a Trip</Text>
          <FloatLabelTextField
            placeholder="Title"
            placeholderTextColor="#B1B1B1"
            value={this.state.title}
            maxLength={50}
            onChangeTextValue={text => this.handleChange(text, 'title')}
          />

          <View style={styles.dateContainer}>
              <FloatLabelDatePicker
                style={styles.datePicker}
                customStyles={{dateText: styles.dateInput}}
                date={ this.state.startDate }
                placeholder="Start Date"
                noBorder={true}
                onChangeDateValue={ (date) => this.handleChange(date, 'startDate') }
                minDate={ new Date }
              />

              <FloatLabelDatePicker
                style={styles.datePicker}
                customStyles={{dateText: styles.dateInput}}
                date={ this.state.endDate }
                placeholder="End Date"
                noBorder={true}
                onChangeDateValue={ (date) => this.handleChange(date, 'endDate') }
                minDate={ this.state.startDate || new Date }
              />
            </View>


          <Button title='Create'
                  color='white'
                  onPress={ this.handleSubmit } />

          <FlatList data={ errors }
                    keyExtractor={item => Object.keys(item)[0]}
                    renderItem={ ({ item }) =>
                    <Text style={styles.errors}>{ Object.values(item)[0] }</Text>} />
          </View>
        </TouchableWithoutFeedback>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={ styles.modalContainer }>
            <View style={ styles.innerModalContainer }>
              <Text style={styles.successText}>Your trip has been created!</Text>
              <Button
                color="#00A9A5"
                onPress={this._shareTextMessage.bind(this)}
                title="Invite your friends" />

              <Button
                onPress={this.redirectToTrip.bind(this)}
                color="#223873"
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
    flex: 1,
    backgroundColor: "#1F2B4B",
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginTop: 100,
    marginBottom: 80,
    color: 'white'
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  datePicker: {
    flex: 0.5,
    width: 155
  },
  dateInput: {
    color: 'white'
  },
  errors: {
    color: 'red'
  },
  modalContainer: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerModalContainer: {
    width: 250,
    height: 150,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  successText: {
    fontSize: 18,
    marginBottom: 10
  }
});

export default NewTripForm;
