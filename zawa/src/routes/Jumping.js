/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-21 00:05:55
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
} from 'react-vr';

import Camera from '../components/Camera';
const rollerCoaster = NativeModules.RollerCoaster;
import Panel from '../components/Panel';

export default class Jumping extends React.Component{
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
        {/* <Pano source={asset('chess-world.jpg')}/> */}
        <DirectionalLight
          style={{
            transform:[
              {translate: [0, 1000, 100]},
              {rotateX: -30}
            ]
          }} 
          intensity={1.0}  
        >
        </DirectionalLight>
        <Panel 
            mode={'game-rollercoaster'}
            onEnterJumping={() => onEnterJumping()}
            onEnterRollerCoaster={() => onEnterRollerCoaster()}
            onBackHome={() => onBackHome()}
            onStartJumping={() => {}}
            onStartRollerCoaster={() => {}}
        />
        <Camera />
        <Text
            style={{
                backgroundColor: '#777879',
                fontSize: 0.8,
                fontWeight: '400',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
        }}>
          hello
        </Text>
      </View> 
    )
  }
}