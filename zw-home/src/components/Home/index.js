/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:18:09 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-13 00:06:30
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
} from 'react-vr';

  
export default class Room extends React.Component {

  constructor() {
    super();
    this.state = {
      controllers: null,
    }
  }

  render() {
    return (
      <View>
        <Model
          source={{
            mtl: asset('models/main_room/room.mtl'),
            obj: asset('models/main_room/room.obj'),
          }}
          style={{
            transform: [
                { translate: [0, 0, 0]}, //初始化进入时的高度
                // { rotateY: 0 },         //矫正camera的视角
            ],
          }}
          lit={true}
        >
        </Model>
      </View>    
    )
  }
}