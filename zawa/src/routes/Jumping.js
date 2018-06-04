/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-06-04 15:46:48
 */
import React from 'react';
import {
  AmbientLight,
  AppRegistry,
  DirectionalLight,
  NativeModules,
  StyleSheet,
  Sound,
  asset,
  Pano,
  Text,
  View,
  Model,
  MediaPlayerState,
  Scene,
  Sphere,
  SpotLight,
  VrHeadModel,
} from 'react-vr';

import Camera from '../components/Camera';
import Button from '../components/Button';
import Mountain from '../components/Mountain';
import Panel from '../components/Panel';

const water = NativeModules.Water;
const rollerCoaster = NativeModules.RollerCoaster;

// const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

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
    height: 0,
    display: "none"
  },
});

export default class Jumping extends React.Component{
  constructor(props) {
    super(props);
    rollerCoaster.hide(false);
    this.state={
      jumpMove: 0,
      jumpUp: 0,
      percent: '',
      // pulse: 0,
      play:'stop',
      textMove: [-0.2, 0.5, -0.4],
      resetCame: false,
      mouIndex:null
    }

    water.setTexture('../../static_assets/water.jpg');
    water.setColor({
      r: 0,
      g: 0,
      b: 1,
    })
    this.power = 0;
    this.accuPower = 0;
    this.Collsion = {};
    const mark = NativeModules.Mark;
    this.sound = {sound: asset('sound/down.mp3'), playerState:new MediaPlayerState({})}
    window.addEventListener('message', (e)=>{
      switch (e.data.type) {
        case 'jumpPosition':
          this.setDis(e.data.jumpDis, e.data.upDis);
          break;
        case 'isCollision':
          this.Collision = e.data.Collision;
          // this.mouIndex = e.data.indexCol
          break;
        case 'moveText':
          this.setState({
            textMove: e.data.moveText.slice()
          })
          break;
        // case 'gamePad':
        //   this.gamePad = e.data.Touch;
        //   console.log('gamePad: ',this.gamePad)
        default:
        return;
      }
    });
    // RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
    //   if (e.type !== 'GamepadInputEvent') {
    //     return;
    //   }
    //   // console.log(e.eventType);
    //   // this.handleEvent(e);
    //   // console.log(RCTDeviceEventEmitter);
    //   // window.postMessage({
    //   //   type:'getGamePad',
    //   //   data:{
    //   //     pre:this.power
    //   //   }
    //   // })
    // });
  }

  setDis(jumpDis,upDis){
    // console.log('jumpDis: ',jumpDis)
    // console.log('jumpUp: ',upDis)
    if(upDis < 0 && this.Collision.isCollision && VrHeadModel.position()[1] >= 3 ){
      this.setState({
        resetCame: false,
        jumMove: 0,
        jumpUp: 0,
        mouIndex: this.Collision.indexCol
      })
      // console.log('VRheadModel: ',VrHeadModel.position())
      window.postMessage({
        type:'endPower',
        data:{
          power: 0
        }
      })
      this.sound.playerState.play();
      console.log('collision: ',this.Collision.isCollision)
    }else if(upDis < 0 && VrHeadModel.position()[1] < -4 && this.Collision.isCollision===false){
      this.setState({
        resetCame: true,
        // jumpMove: 0,
        // jumpUp: 0
      })
      window.postMessage({
        type:'endPower',
        data:{
          power: 0
        }
      })
      console.log('collision: ',this.Collision.isCollision)      
    }else{
      this.setState({
        resetCame: false,
        jumpMove: jumpDis,
        jumpUp: upDis
      })
      console.log('power')
    }
    // console.log('collision: ',this.Collision.isCollision)
  }


  setJumpDistance(power){
    // console.log('power: ',power)
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
      this.power += 0.001;
    }else{
      this.power = 1;
    }
    this.setState({
      jumpMove:0,
      jumpUp: 0,
      percent: `${(this.power * 100).toFixed()}%`,
      // pulse: this.power,
      play: 'play'
    })
    // window.postMessage ( { type: "direction",  data: {
    //   move : [moveDir, moveOrigin]
    // }} ) ;
    // window.postMessage({
    //   type: "rotateText",
    //   data:{
    //     HmPos: VrHeadModel.rotation()[1]
    //   }
    // })
  }

  clearAccumulation(){
    this.setState({
      percent: '',
      pulse: 0,
      play: 'stop',
    })
    this.setJumpDistance(this.power)
    this.power = 0;
    // window.postMessage ( { type: "direction",  data: {
    //   move : [null, null]
    // }} ) ;
    // console.log('endPower: ',this.power)
  }

  render() {
    const accuPower = this.state.jumpMove;
    const upPower = this.state.jumpUp;
    const rotate = VrHeadModel.rotation();
    // console.log('vrPos: ', VrHeadModel.position());
    // console.log('vrRot: ', VrHeadModel.rotation());
    // console.log('upPower: ',upPower);
    // console.log('reset: ', this.state.resetCame);
    const move = [-1 * accuPower * Math.sin(rotate[1] * Math.PI / 180 ), upPower, -1 * accuPower * Math.cos(rotate[1] * Math.PI / 180)];
    // const moveDir = [-1 * 3 * Math.sin(rotate[1] * Math.PI / 180 ), 4 , -1 * 3 * Math.cos(rotate[1] * Math.PI / 180)];
    // const moveOrigin = [-1 * 2 * Math.sin(rotate[1] * Math.PI / 180 ), 4 , -1 * 2 * Math.cos(rotate[1] * Math.PI / 180)];
    // const originPos = [0, 4, 0];
    
    window.postMessage({
      type:'postVrHeadModel',
      data:{
        HmPosition: VrHeadModel.position()
      }
    });
    const { 
      onEnterJumping,
      onEnterRollerCoaster,
      onBackHome,
     } = this.props;
    
    // const cameraRotate = [0, rotate[1], 0];
    return (
      <View>
        {/* <Pano source={asset('chess-world.jpg')}/> */}
        {/* <Camera /> */}
        <Panel 
            mode={'game-rollercoaster'}
            onEnterJumping={() => onEnterJumping()}
            onEnterRollerCoaster={() => onEnterRollerCoaster()}
            onBackHome={() => onBackHome()}
            onStartJumping={() => {}}
            onStartRollerCoaster={() => rollerCoaster.start()}
        />
        <AmbientLight 
          style={{
            transform: [
              {translate: [0, 1, 0]}  
            ],
            color: "#778899"
          }}
          intensity={1}
        ></AmbientLight>
        <DirectionalLight
          style={{
            transform: [
              {translate: [1,8,1]}
            ],
            color: "#606060"
          }}
          intensity={1}
        ></DirectionalLight>
        <SpotLight
          style={{
            transform:[
              {translate: [-1,70,0]}
            ]
          }}
          intensity={0.5}
        ></SpotLight>

        <Pano source={asset('heaven.png')} />
        <Text
          style={{
            fontSize: 0.05,
            color: '#33e8ec',
            transform:[
              {translate: [VrHeadModel.position()[0]+this.state.textMove[0], VrHeadModel.position()[1], VrHeadModel.position()[2]+this.state.textMove[2]]},
            ]
          }}
        >
          {this.state.percent}
        </Text>
        <Sound
          style = {{
            transform:[
              {translate: [-2, 0, -4]}
            ]
          }}
          source = {asset('sound/sea.mp3')}
          autoPlay = {true}
          loop = {true}
          volume = {5.0}
        ></Sound>
        <Sound
          source = {asset('sound/add.mp3')}
          autoPlay = {false}
          playControl = {this.state.play}
          volume={10.0}
        ></Sound>
        <Sound
          style = {{
            transform: [
              {translate: VrHeadModel.position()}
            ]
          }}
          source = {this.sound.sound}
          playerState = {this.sound.playerState}
        ></Sound>

        <Button 
          style={Styles.jumping}
          needFocus={false}
          index={1}
          button={2}
          eventType={'keydown'}
          // pulse={this.state.pulse}
          onEvent={() => this.Accumulation()}
        ></Button>
        <Button 
          style={Styles.jumping}
          needFocus={false}          
          index={1}
          button={2}
          eventType={'keyup'}
          // pulse={this.state.pulse}
          onEvent={() => this.clearAccumulation()}
        ></Button>

        <Camera 
          enableTeleport={false}
          mode={'game-jumping'}
          initPosition={[0, 0, 0]}
          reset={this.state.resetCame}
          resetPosition={move.slice()}
          position={move.slice()} 
        />
        <Mountain moveIndex={ this.state.mouIndex } />
        {/* test stone position  */}
        <Model
          source={{
            obj: asset('models/testCube/testCube.obj'),
            mtl: asset('models/testCube/testCube.mtl')
          }} 
          style={{
            transform: [
              {translate: [-20.1, 3, -35]},
              {scale: 2.2}
            ]
          }}
        />
      </View>
    )
  }
}