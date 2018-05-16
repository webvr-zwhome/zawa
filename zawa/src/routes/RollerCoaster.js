/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-16 21:28:47
 */
import React from 'react';
import {
  AmbientLight,
  AppRegistry,
  DirectionalLight,
  NativeModules,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
  Sphere,
  SpotLight,
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
        {/* <AmbientLight
          style={{
            transform:[
              {translate: [0, 100, 0]},
              {rotateX: 30}
            ]
          }} 
          intensity={0.1} 
        ></AmbientLight> */}
        {/* <DirectionalLight
          style={{
            transform:[
              {translate: [100, 1000, 1000]},
              {rotateX: 60}
            ]
          }} 
          intensity={0.5}  
        >
        </DirectionalLight> */}
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
        {/* <SpotLight
          angle={Math.PI/2}
          decay={2}
          // distance={500}
          intensity={2.0}  
          style={{
            transform:[
              {translate: [0, 10, 0]},
              {rotateX: 60}
            ]
          }} 
        ></SpotLight> */}
        <Camera />
        <World 
          hasTree={false} 
          plane={{
            obj: asset('models/plane/plane_roller.obj'),
            mtl: asset('models/plane/plane_roller.mtl'),
        }}>
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