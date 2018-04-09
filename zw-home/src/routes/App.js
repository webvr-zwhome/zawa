/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-09 21:27:40
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

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Pano source={asset('heaven.png')}/>
        <Camera />
        <Home />
        {/* <Camera /> */}
      </View> 
    )
  }
}