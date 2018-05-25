/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-24 19:47:18
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
  DirectionalLight,
  AmbientLight,
} from 'react-vr';

import Camera from '../components/Camera';
import Home from '../components/Home';
import Tree from '../components/Tree';
import AmbientLightAll from '../components/Light/ambientLightAll'; 
import World from '../components/World';
import Human from '../components/Human';
import Panel from '../components/Panel';
// import Hoster from '../components/Human/Hoster';
const rollerCoaster = NativeModules.RollerCoaster;

export default class App extends React.Component{
  constructor(props) {
    super(props);
    rollerCoaster.hide(false);
  }
  render() {
    const { 
      onEnterJumping,
      onEnterRollerCoaster,
      onBackHome,
    } = this.props;
    return (
      <View>
      <AmbientLight 
        intensity={ 1 }
        style={{
          transform: [
            {translate: [0, 0, 0]}
          ],
          color: "#fff",
        }} 
      />        
      <DirectionalLight
          style={{
            transform:[
              {translate: [0, 1000, 100]},
              {rotateX: -45}
            ]
          }} 
          intensity={1.0}  
        >
        </DirectionalLight>
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