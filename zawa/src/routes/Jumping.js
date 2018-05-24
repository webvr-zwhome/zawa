/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-24 22:28:22
 */
import React from 'react';
import {
  AmbientLight,
  AppRegistry,
  DirectionalLight,
  MediaPlayerState,
  NativeModules,
  StyleSheet,
  Sound,
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
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

// const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


const Styles = StyleSheet.create({
  button: {
    backgroundColor: '#777879',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#7b612f',
    flex: 1,
    flexDirection: 'column',
    width: 0,
    height: 0,
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
  },
  jumping: {
    width: 0,
    height: 0
  }
});

export default class Jumping extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      jumpMove: 0,
      jumpUp: 0,
      percent: '',
      pulse: 0,
      play:'stop',
      textMove: [-0.2, 0.5, -0.4],
      mouUp: 0,
      resetCame: false,
    }

    this.power = 0;
    this.accuPower = 0;
    this.isCollision = false;
    // const gamePad = window.navigator.getGamepads();
    // this.HapticActuators  = gamePad[1].hapticActuators;
    // this.percent = {};
    const mark = NativeModules.Mark;
    // this.sound = {sound: asset('sound/add.mp3'), playerState:new MediaPlayerState({})}
    window.addEventListener('message', (e)=>{
      switch (e.data.type) {
        case 'jumpPosition':
          this.setDis(e.data.jumpDis, e.data.upDis);
          break;
        case 'isCollision':
          this.Collision = e.data.Collision;
          this.mouIndex = e.data.indexCol
          break;
        case 'moveText':
          this.setState({
            textMove: e.data.moveText.slice()
          })
          break;
        case 'gamePad':
          this.gamePad = e.data.Touch;
          console.log('gamePad: ',this.gamePad)
        default:
        return;
      }
    });
    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
      if (e.type !== 'GamepadInputEvent') {
        return;
      }
      // console.log(e.eventType);
      // this.handleEvent(e);
      // console.log(RCTDeviceEventEmitter);
      window.postMessage({
        type:'getGamePad',
        data:{
          pre:this.power
        }
      })
    });
  }

  setDis(jumpDis,upDis){
    console.log('jumpDis: ',jumpDis)
    console.log('jumpUp: ',upDis)
    if(upDis < 0 && this.Collision.isCollision){
      this.setState({
        resetCame: false,
        jumMove: 0,
        jumpUp: -upDis,
      })
      // console.log('VRheadModel: ',VrHeadModel.position())
      window.postMessage({
        type:'endPower',
        data:{
          power: 0
        }
      })
    }else if(upDis < 0 && VrHeadModel.position()[1] < 1 && this.Collision.isCollision===false){
      this.setState({
        resetCame: true
      })
    }else{
      this.setState({
        resetCame: false,
        jumpMove: jumpDis,
        jumpUp: upDis
      })
    }
  }


  setjumpDistance(power){
    // let jumpTime = 0;
    // let defaultPower = 5;
    // const interval = setInterval(()=>{
    //   let g = 98;
    //   jumpTime+=0.01;
    //   let jumpDis = power/10 * defaultPower * jumpTime;
    //   let upDis = power * defaultPower * jumpTime - g * Math.pow(jumpTime, 2)/2;
    //   this.setState({
    //     jumpMove: jumpDis,
    //     jumpUp: upDis
    //   })

    //   if(VrHeadModel.position()[1]<1){
    //     clearInterval(interval)
    //     this.setState({
    //       jumpMove: 0,
    //       jumpUp: 0,
    //     })
    //     console.log('clear')
    //   }
    // },100)
    console.log('power: ',power)
    //向client发送蓄力值信息
    window.postMessage({
      type:'postPower',
      data:{
        power: power
      }
    })
  }

  Accumulation(){
    if(this.power < 1){
      this.power += 0.01;
    }else{
      this.power = 1;
    }
    this.setState({
      jumpMove:0,
      jumpUp: 0,
      percent: `${(this.power * 100).toFixed()}%`,
      pulse: this.power,
      play: 'play'
    })
    // window.postMessage ( { type: "direction",  data: {
    //   move : [moveDir, moveOrigin]
    // }} ) ;
    window.postMessage({
      type: "rotateText",
      data:{
        HmPos: VrHeadModel.rotation()[1]
      }
    })
    // console.log('moveDir: ',moveDir)
    // console.log('power: ',this.power)
  }

  clearAccumulation(){
    // this.setState({
    //   jumpMove: this.power
    // })
    // this.hapticActuators.pulse(0);
    this.setState({
      percent: '',
      pulse: 0,
      play: 'stop',
    })
    this.setjumpDistance(this.power)
    
    this.power = 0;
    // window.postMessage ( { type: "direction",  data: {
    //   move : [null, null]
    // }} ) ;
    console.log('endPower: ',this.power)
  }

  render() {
    const accuPower = this.state.jumpMove;
    const upPower = this.state.jumpUp;
    const rotate = VrHeadModel.rotation();
    console.log('vrPos: ', VrHeadModel.position());
    console.log('vrRot: ', VrHeadModel.rotation());
    console.log('upPower: ',upPower);
    // console.log('vrRot: ', rotate);
    const move = [-1 * accuPower * Math.sin(rotate[1] * Math.PI / 180 ), upPower, -1 * accuPower * Math.cos(rotate[1] * Math.PI / 180)];
    const moveDir = [-1 * 3 * Math.sin(rotate[1] * Math.PI / 180 ), 4 , -1 * 3 * Math.cos(rotate[1] * Math.PI / 180)];
    const moveOrigin = [-1 * 2 * Math.sin(rotate[1] * Math.PI / 180 ), 4 , -1 * 2 * Math.cos(rotate[1] * Math.PI / 180)];
    
    window.postMessage({
      type:'postVrHeadModel',
      data:{
        HmPosition: VrHeadModel.position()
      }
    })
    // console.log('move: ', move);
    
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
        <Pano source={asset('heaven.jpg')} />
        {/* <Text
          style={{
            fontSize: 0.05,
            color: 'green',
            transform:[
              // {translate: [VrHeadModel.position()[0]+this.state.textMove[0], VrHeadModel.position()[1]+this.state.textMove[1], VrHeadModel.position()[2]+this.state.textMove[2]]},
              // {rotateY: (VrHeadModel.rotation()[1])  * Math.PI / 180},
              {translate: [VrHeadModel.position()[0]+this.state.textMove[0], 4, VrHeadModel.position()[2]+this.state.textMove[2]]},

              // {rotateY: VrHeadModel.rotation()[1]}
              // {translate:[0, 4, -0.6]}
            ]
          }}
        >
          {this.state.percent}
       

        </Text> */}
        <Sound
          source = {asset('sound/add.mp3')}
          autoPlay = {false}
          playControl = {this.state.play}
          volume={10.0}
        ></Sound>
        <Button 
          style={Styles.getIntoJumping}
          needFocus={false}
          index={1}
          button={1}
          eventType={'keydown'}
          pulse={this.state.pulse}
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
          pulse={this.state.pulse}
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
        <Camera vrPosition={ false }  position={move.slice()} reset={this.state.resetCame} />
        <Mountain move={upPower} moveIndex={this.mouIndex} />
      </View>
    )
  }
}