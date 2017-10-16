import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';

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

class FloatLabelDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: this.props.date
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('date') && newProps.date !== this.state.date) {
      this.setState({ date: newProps.date });
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
      <View style={styles.inputContainer}>
        <View style={styles.viewContainer}>
          <View style={[styles.paddingView, this.leftPadding()]} />
          <View style={[styles.fieldContainer, this.withBorder()]}>
            <FloatingLabel visible={this.state.date}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.date}>
              <DatePicker {...this.props}
                format='YYYY-MM-DD'
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(value) => this.setDate(value)} />
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
    if (this.state.date) {
      return this.props.placeholder;
    }
  }

  setDate(value) {
    this.setState({
      date: value
    });
    try {
      return this.props.onChangeDateValue(value);
    } catch (_error) { }
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  paddingView: {
    width: 5
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
    position: 'relative',
    height: 50
  },
  withBorder: {
    borderBottomWidth: 1 / 2,
    borderColor: '#C8C7CC',
  },
  valueText: {
    height: 20,
    fontSize: 16,
    color: 'white'
  },
  focused: {
    color: "#B1B1B1"
  }
});

export default FloatLabelDatePicker;
