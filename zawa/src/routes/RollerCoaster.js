/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-20 22:58:23
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
  Plane,
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
import Panel from '../components/Panel';
const rollerCoaster = NativeModules.RollerCoaster;

const Styles = StyleSheet.create({
  interface: {
    display: 'flex',
    // width: 8,
    backgroundColor: '#fff',
    opacity: 0.5,
    padding: 0.1,
    borderRadius: 0.5,
    borderWidth: 0.05,
    transform: [
      {translate: [-2, 5, -15]},
    ],
  },
  startRollerCoaster: {
    // position: 'relative',
    opacity: 1,
    margin: 0.1,
    width: 2,
    height: 1,
    // transform: [
    //   {translate: [0, 0, 0]},
    // ],
  },
  backHome: {
    opacity: 1,
    margin: 0.1,
    // transform: [
    //   {translate: [3, 0, 0]},
    // ],
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
    rollerCoaster.hide(true);
  }

  render() {

    const { 
      onEnterJumping,
      onEnterRollerCoaster,
      onBackHome,
     } = this.props;
    return (
      <View>
        <Panel 
            mode={'game-rollercoaster'}
            onEnterJumping={() => onEnterJumping()}
            onEnterRollerCoaster={() => onEnterRollerCoaster()}
            onBackHome={() => onBackHome()}
            onStartJumping={() => {}}
            onStartRollerCoaster={() => rollerCoaster.start()}
        />

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
          {/* <View style={Styles.interface}> */}
            {/* <View> */}
              {/* <Button 
                style={Styles.startRollerCoaster}
                index={0}
                button={3}
                eventType={'keydown'}
                onEvent={() => rollerCoaster.start()}>
                  <Text style={Styles.text}>START</Text>
              </Button> */}
            {/* </View> */}
            {/* <View> */}
              {/* <Button 
                  style={Styles.backHome}
                  index={0}
                  button={3}
                  eventType={'keydown'}
                  onEvent={() => backHandler()}>
                  <Text style={Styles.text}>BACK</Text>
              </Button> */}
            {/* </View> */}
          {/* </View> */}
        </World>
      </View> 
    )
  }
}