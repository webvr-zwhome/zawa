/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-16 22:47:10
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


const Styles = StyleSheet.create({
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

export default class Jumping extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      jumpMove: 0,
      jumpUp: 0
    }

      this.power = 0;
      this.accuPower = 0;
  }

  setjumpDistance(power){
    let jumpTime = 0;
    let defaultPower = 100;
    const interval = setInterval(()=>{
      let g = 9.98;
      jumpTime+=0.01;
      let jumpDis = power * defaultPower * jumpTime;
      let upDis = power * defaultPower * jumpTime - g * Math.pow(jumpTime, 2);
      this.setState({
        jumpMove: jumpDis,
        jumpUp: upDis
      })

      // if(VrHeadModel.position()[1]<-1){
      //   clearInterval(interval)
      // }
    },300)
  }

  Accumulation(){
    this.power += 0.00001;
    // console.log('power: ',this.power)
  }

  clearAccumulation(){
    // this.setState({
    //   jumpMove: this.power
    // })
    this.setjumpDistance(this.power)
    this.power = 0;
    console.log('endPower: ',this.power)
  }

  render() {
    const accuPower = this.state.jumpMove;
    const upPower = this.state.jumpUp;
    const rotate = VrHeadModel.rotation();
    // console.log('vrPos: ', VrHeadModel.position());
    // console.log('vrRot: ', rotate);
    const move = [-1 * accuPower * Math.sin(rotate[1] * Math.PI / 180 ), upPower, -1 * accuPower * Math.cos(rotate[1] * Math.PI / 180)];
    const moveDir = [-1 * (accuPower + 3)* Math.sin(rotate[1] * Math.PI / 180 ), 4 , -1 *(accuPower + 3) * Math.cos(rotate[1] * Math.PI / 180)];
    
    // console.log('move: ', move);
    window.postMessage ( { type: "direction",  data: {
      move : moveDir
    }} ) ;
    // const cameraRotate = [0, rotate[1], 0];
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
          style={Styles.getIntoJumping}
          needFocus={false}
          index={1}
          button={1}
          eventType={'keydown'}
          onEvent={() => this.Accumulation()}
        >
          {/* <Text style={Styles.text}>JUMPING</Text> */}
        </Button>
        <Button 
          style={Styles.getIntoJumping}
          needFocus={false}          
          index={1}
          button={1}
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
        <Camera vrPosition={ true }  position={move.slice()} />
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