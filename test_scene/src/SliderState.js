import React from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
} from 'react-vr';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class SliderState extends React.Component {
  constructor() {
    super();
    this.state = {hasFocus: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      return true;
    }
    return nextState.hasFocus !== this.state.hasFocus;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: this.state.hasFocus ? '#333333' : 'black',
        }}
        onEnter={() => this.setState({hasFocus: true})}
        onExit={() => this.setState({hasFocus: false})}
      >
        <View style={{width: 0.5, height: 0.1}}>
          <Text style={{fontSize: 0.08, textAlign: 'center'}}>
            {this.props.id}
          </Text>
        </View>
        <View style={{width: 0.4, height: 0.1}}>
          <View
            style={{
              width: 0.4 * (this.props.value + 1) / 2,
              height: 0.1,
              backgroundColor: 'yellow',
            }}
          />
        </View>
      </View>
    );
  }
}