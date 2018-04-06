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
import PressState from './PressState';
import SliderState from './SliderState';
import Camera from './containers/Camera';
// import getController from './utils/getController';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class ControllerState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: [],
            axes: [],
        };
        // getController((buttons, axes) => this.setState({
        //   buttons,
        //   axes,
        // }));
        // console.log('wdwedewf');
        // getController((buttons, axes) => console.log('ddddddddds', buttons));
        // RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
        //     if (e.type !== 'GamepadInputEvent' || this.props.controller.index !== e.gamepad) {
        //       return;
        //     }
        //     if (e.eventType === 'keydown') {
        //       const buttons = this.state.buttons.concat([]);
        //       buttons[e.button] = true;
        //       this.setState({buttons});
        //     } else if (e.eventType === 'keyup') {
        //       const buttons = this.state.buttons.concat([]);
        //       buttons[e.button] = false;
        //       this.setState({buttons});
        //     } else if (e.eventType === 'axismove') {
        //       const axes = this.state.axes.concat([]);
        //       axes[e.axis] = e.value;
        //       this.setState({axes});
        //     }
        //   });
    }
    render() {
        const style = {
          flex: 1,
          flexDirection: 'column',
          marginLeft: 0.1,
          marginRight: 0.1,
        };
        const buttons = [];
        for (let i = 0; i < this.props.controller.buttons; i++) {
          buttons.push(
            <PressState key={'btn' + i} id={'Btn ' + i} pressed={this.state.buttons[i] || false} />
          );
        }
        const axes = [];
        for (let i = 0; i < this.props.controller.axes; i++) {
          // if (i === 0) {
          //   axes.push(<Room key={'axis' + i} id={'Axis ' + i} value={this.state.axes[0]}/>);
          // }
          axes.push(<SliderState key={'axis' + i} id={'Axis ' + i} value={this.state.axes[i] || 0} />);
        }
        // const cameraState = this.state.axes[]
        const { hand } = this.props;
        return (
          <View style={style}>
            {buttons}
            {axes}
          </View>
        );
      }

}