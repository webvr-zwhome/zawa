/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-23 23:38:41
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

export default class FoodShot extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {/* <AmbientLightAll /> */}
        <Camera />
        <World hasTree={false}>
        </World>
      </View> 
    )
  }
}