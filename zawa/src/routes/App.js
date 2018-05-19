/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-19 11:14:17
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
import Human from '../components/Human';
import Panel from '../components/Panel';
// import Hoster from '../components/Human/Hoster';


export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { 
      onEnterJumping,
      onEnterRollerCoaster,
      onBackHome,
    } = this.props;
    return (
      <View>
        {/* <AmbientLightAll /> */}
        <Panel 
            mode={'home'}
            onEnterJumping={() => onEnterJumping()}
            onEnterRollerCoaster={() => onEnterRollerCoaster()}
            onBackHome={() => onBackHome()}
            onStartJumping={() => {}}
            onStartRollerCoaster={() => {}}
        />
        <Camera />
        <World >
          <Home />
        </World>
      </View> 
    )
  }
}