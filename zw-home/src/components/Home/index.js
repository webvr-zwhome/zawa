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
                { rotateY: 0 },         //矫正camera的视角
            ],
          }}
        >
        </Model>
      </View>    
    )
  }
}