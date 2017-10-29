import React from 'react';
import { View, Text, TextInput, Keyboard, Button, FlatList, Share, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-datepicker';
import FloatLabelTextField from '../form/float_label_text_field';
import FloatLabelDatePicker from '../form/float_label_datepicker';
import * as firebase from 'firebase';
import { Toolbar } from 'react-native-material-ui';

class EditTripForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      errors: []
    };
    this.tripID = props.navigation.state.params.id;
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._shareTextMessage = this._shareTextMessage.bind(this);
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

  componentDidMount() {
    const editedTripRef = firebase.database()
                                  .ref(`/trips/${this.tripID}`)
                                  .once('value', snap => this.setState(snap.val()));
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
    this.setState({ errors }, () => {
      if (this.state.errors.length === 0) {
        this.updateInFirebase();
      }
    });
  }

  updateInFirebase() {
    const userID = this.props.currentUser.id;
    this.setState({ title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate }, () =>
      this.props.editTrip(this.state)
                .then(() => this.props.navigation.navigate("Dashboard")));
  }

  render() {
    const errors = this.state.errors.map((el, i) => { return { [i]: el }; });

    return (
      <View style={styles.container}>
        <Toolbar
          style={{ container: { paddingTop: 45, height: 90 } }}
          leftElement="chevron-left"
          onLeftElementPress={() => this.props.navigation.navigate("Dashboard")}
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Edit Trip</Text>

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

            <Button title='Edit'
              color='white'
              onPress={ this.handleSubmit }/>

          <Button title='Invite friends to your trip'
                  color='#00A9A5'
                  onPress={this._shareTextMessage}/>

          <FlatList data={ errors }
                    keyExtractor={item => Object.keys(item)[0]}
                    renderItem={ ({ item }) => <Text>{ Object.values(item)[0] }</Text>} />
          </View>
        </TouchableWithoutFeedback>
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
  },
  inputContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  paddingView: {
    width: 15
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  fieldLabel: {
    height: 15,
    fontSize: 10,
    color: '#B1B1B1'
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: '#C8C7CC',
  },
  valueText: {
    height: 20,
    fontSize: 16,
    color: '#111111'
  },
  focused: {
    color: "#1482fe"
  }
});

export default EditTripForm;
