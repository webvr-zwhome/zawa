/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-13 00:04:03
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
import Light from '../components/Light/ambientLight'; 
import World from '../components/World';

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Light />
        <Camera />
        <World >
          <Home />
        </World>
      </View> 
    )
  }
}