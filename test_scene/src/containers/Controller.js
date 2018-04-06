import React from 'react';
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

import ControllerState from '../ControllerState';
import controllerDetection from '../utils/controllerDetection';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const styles = StyleSheet.create({
    waiting: {
      backgroundColor: 'black',
      fontSize: 0.3,
      layoutOrigin: [0.5, 0.5],
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      textAlignVertical: 'center',
      transform: [{translate: [0, 0, -3]}],
    },
    controllers: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      transform: [{translate: [0, 0, -3]}],
    },
});


const ControllerList = controllers => {
    if (controllers.length < 1) {
      return (
        <View style={{backgroundColor: 'black', padding: 0.2}}>
          <Text>No controllers</Text>
        </View>
      );
    }
    // console.log('con: ', controllers);
    return controllers.map(c => <ControllerState key={c.index} controller={c} />);
};

export default class Controller extends React.Component {

    constructor() {
        super();
        this.state = {
          controllers: null,
        }
       
        // 检测controller
        controllerDetection((controllers) => this.setState({
            controllers: controllers
        }))
    }

    render() {      
        const controller = this.state.controllers === null
            ? <Text style={styles.waiting}>Waiting</Text>
            : <View style={styles.controllers}>
                {ControllerList(this.state.controllers)}
              </View>
        const hand = this.props.hand;
        return (
            <View>
                {controller}
                {this.props.children}
            </View>    
        )
    }
}