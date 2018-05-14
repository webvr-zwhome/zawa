/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-13 23:11:50
 */
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
  Sphere,
  VrHeadModel,
} from 'react-vr';

import Camera from '../components/Camera';
// import AmbientLightAll from '../components/Light/ambientLightAll'; 
import World from '../components/World';
import Button from '../components/Button';
const rollerCoaster = NativeModules.RollerCoaster;

const Styles = StyleSheet.create({
  startRollerCoaster: {
    transform: [
      {translate: [3, 6, -15]},
    ],
  },
  text: {
    fontSize: 0.2, 
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default class RollerCoasterGame extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Camera />
        <World hasTree={false}>
        <Button 
            style={Styles.startRollerCoaster}
            index={0}
            button={3}
            eventType={'keydown'}
            onEvent={() => rollerCoaster.start()}>
              <Text style={Styles.text}>START</Text>
          </Button>
        </World>
      </View> 
    )
  }
}