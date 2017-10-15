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
// import FloatLabelTextField from 'react-native-floating-label-text-input';
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

        <Text>Title</Text>
        <TextInput placeholder="Add Title"
                   onChangeText={text => this.handleChange(text, 'title')}/>

        <FloatLabelTextField
          placeholder="Title"
          value=""
          defaultValue=""
          maxLength={100}
          onChangeTextValue={text => this.handleChange(text, 'title')}
          onFocus={() => console.log("in focus")}
          onBlur={() => console.log("blurr")}
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
    height: (Platform.OS === 'ios' ? 20 : 60),
    fontSize: 16,
    color: '#111111'
  },
  focused: {
    color: "#1482fe"
  }
});

export default NewTripForm;

import { Component } from 'react';
import {
  Animated,
  Platform
} from 'react-native';

class FloatingLabel extends Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    };
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.floatingLabel, { paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    };
  }

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class FloatLabelTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      text: this.props.value
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('value') && newProps.value !== this.state.text) {
      this.setState({ text: newProps.value });
    }
  }

  leftPadding() {
    return { width: this.props.leftPadding || 0 };
  }

  withBorder() {
    if (!this.props.noBorder) {
      return styles.withBorder;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={[styles.paddingView, this.leftPadding()]} />
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <TextInput {...this.props}
                ref='input'
                underlineColorAndroid="transparent"
                style={[styles.valueText]}
                defaultValue={this.props.defaultValue}
                value={this.state.text}
                maxLength={this.props.maxLength}
                onFocus={() => this.setFocus()}
                onBlur={() => this.unsetFocus()}
                onChangeText={(value) => this.setText(value)}
                />
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  }

  inputRef() {
    return this.refs.input;
  }

  focus() {
    this.inputRef().focus();
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }

  setFocus() {
    this.setState({
      focused: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) { }
  }

  unsetFocus() {
    this.setState({
      focused: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) { }
  }

  labelStyle() {
    if (this.state.focused) {
      return styles.focused;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value
    });
    try {
      return this.props.onChangeTextValue(value);
    } catch (_error) { }
  }
}
