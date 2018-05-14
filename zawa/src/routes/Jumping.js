/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-13 14:50:57
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
import Button from '../components/Button';
import Mountain from '../components/Mountain';
// const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


export default class Jumping extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      jumpMove: 0
    }
    this.Styles = StyleSheet.create({
      button: {
      backgroundColor: '#777879',
      borderRadius: 0.2,
      borderWidth: 0.01,
      borderColor: '#7b612f',
      flex: 1,
      flexDirection: 'column',
      width: 2,
      height: 0.5,
      alignItems: 'stretch',
      justifyContent: 'center',
      },
      getIntoJumping: {
      transform: [
      {translate: [3, 6, -15]},
      ],
      },
      getIntoRollerCoaster: {
      transform: [
      {translate: [-10, 6, 3]},
      {rotateY: 90}
      ],
      },
      backHome: {
      transform: [
      {translate: [4, 4, -3]}
      ],
      },
      text: {
      fontSize: 0.2, 
      textAlign: 'center',
      textAlignVertical: 'center',
      }
      });
      this.power = 0;

  }

  Accumulation(){
    this.power++;
    console.log('power: ',this.power)
  }

  clearAccumulation(){
    this.setState({
      jumpMove: this.power
    })
    this.power = 0;
    console.log('endPower: ',this.power)
  }

  render() {
    const move = this.state.jumpMove;
    return (
      <View>
        {/* <Scene 
          style={{
            transform: [
              { translate: [move/10, 0, 0]},
              // { translate: [moveX, CAMERA_HEIGHT, moveZ]},    //camera的位置
              // { rotateY:  rotate },                           //camera的旋转
            ],
          }}
        >                     
        </Scene>  */}
        <Pano source={asset('heaven.jpg')}/>
        <Button 
          style={this.Styles.getIntoJumping}
          needFocus={false}
          index={1}
          button={3}
          eventType={'keydown'}
          onEvent={() => this.Accumulation()}
        >
          {/* <Text style={Styles.text}>JUMPING</Text> */}
        </Button>
        <Button 
          style={this.Styles.getIntoJumping}
          needFocus={false}          
          index={1}
          button={3}
          eventType={'keyup'}
          onEvent={() => this.clearAccumulation()}
        >
          {/* <Text style={Styles.text}>JUMPING</Text> */}
        </Button>


        
        {/* <Camera /> */}
        <AmbientLight 
          style={{
            transform: [
              {translate: [0, 1, 0]}  
            ],
            color: "#778899"            
          }}
          intensity={1}
        >
         </AmbientLight>
        <DirectionalLight
          style={{
            transform: [
              {translate: [1,8,1]}
            ],
            color: "#606060"
          }}
          intensity={1}
        >
        </DirectionalLight>
        <SpotLight
          style={{
            transform:[
              {translate: [-1,70,0]}
            ]
          }}
          intensity={0.5}
        >
        </SpotLight>
        {/* <World /> */}
        <Pano 
          source={asset('heaven.png')}
        >
        </Pano>
        <Camera />
        {/* <Text
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
        </Text> */}
        <Mountain />
      </View> 
    )
  }
}