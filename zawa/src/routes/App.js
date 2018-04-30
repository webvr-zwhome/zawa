/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-14 14:59:09
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
import Home from '../components/Home';
import Tree from '../components/Tree';
// import AmbientLightAll from '../components/Light/ambientLightAll'; 
import World from '../components/World';

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {/* <AmbientLightAll /> */}
        <Camera />
        <World >
          {/* <Home /> */}
        </World>
      </View> 
    )
  }
}