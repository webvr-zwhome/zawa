/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:18:16 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-06-06 18:08:10
 */
import React from 'react';
import { PerspectiveCamera } from 'three';
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
  VrHeadModel,
} from 'react-vr';

import { cameraMove } from './move';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
// import RollerChair from '../RollerChair';

// const rollerCoaster = NativeModules.RollerCoaster;


export default class Camera extends React.Component {

  constructor(props) {
    super(props);
    const cameraPosition = VrHeadModel.position();
    // console.log(props);
    this.state = {
      // buttons: [],     // 手柄按键
      // axes: [],        // 手柄遥杆
      // viewportX: 0,    // 鼠标X
      // viewportY: 0,    // 鼠标Y
      // move: 0,         // 前后移动偏移量 清零计算
      // moveX: 0,        // 世界坐标camera的x轴位置
      // moveZ: 0,        // 世界坐标camera的z轴位置
      // rotate: 0,       // 左右旋转值 叠加计算
      // isSecond: false, // 针对手柄，手柄摇杆的横纵向值不是同时检测
      // vrHeadModelPosition: [0, 0, 0],
      initPosition: props.initPosition,
      teleportPosition:props.initPosition,
      rollerPosition: props.initPosition,
      rollerRotation: [0, 0, 0],
      
      jumpingPosition: props.initPosition, 

      // cameraPosition: [cameraPosition[0], 4, cameraPosition[2]],
      // cameraRotation: [0, 0, 0],
    }
    // let preAxes = [];
  /* 
    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {     
      if (e.type !== 'MouseInputEvent' && e.type !== 'KeyboardInputEvent') 
      {console.log('e1', e);}
      if (e.eventType === 'mousemove' && e.shiftKey) {

        const preX = this.state.viewportX;
        const preY = this.state.viewportY;

        const move = cameraMove(preX, preY, e.viewportX, e.viewportY);
        
        if(move.step !== 0) {
          this.setState({
            viewportX: e.viewportX,
            viewportY: e.viewportY,
            move: move.step,
            moveX: this.state.moveX - this.state.move * Math.sin(this.state.rotate),
            moveZ: this.state.moveZ - this.state.move * Math.cos(this.state.rotate),
            vrHeadModelPosition: VrHeadModel.position(),
          })
        }
        if(move.angle !== 0) {
          this.setState({
            viewportX: e.viewportX,
            viewportY: e.viewportY,
            move: 0,
            rotate: this.state.rotate + move.angle,
            vrHeadModelPosition: VrHeadModel.position(),
          })
        }
      }
      // -------示例代码 勿删---------
      if (e.eventType === 'keydown') {
          const buttons = this.state.buttons.concat([]);
          buttons[e.button] = true;
          this.setState({buttons});
      } else if (e.eventType === 'keyup') {
          const buttons = this.state.buttons.concat([]);
          buttons[e.button] = false;
          this.setState({buttons});
      } 

      // 左手柄摇杆控制漫游
      if (e.gamepad === 0 && e.eventType === 'axismove') {

        console.log('e2', e);   
        const axes = this.state.axes.slice(); //当前摇杆的值的数组
        if(!this.state.isSecond) {
            axes[e.axis] = e.value;
        }
      
        if (e.axis === 0) {
            preAxis0 = this.state.axes[0];   // 0-横向摇杆控制左右旋转
            preAxis1 = this.state.axes[1];   // 1-纵向摇杆控制前后移动
            preAxes = this.state.axes;
            axes[0] = e.value;  //先获得摇杆横向的值
            console.log('获取第一个数: ', axes);
            this.setState({
                axes,
                isSecond: true,
            })
          } else if (this.state.isSecond && e.axis === 1) {

            axes[1] = e.value;
            console.log('获取第二个数: ', axes);
            const move = cameraMove(preAxes[0], preAxes[1], axes[0], axes[1]);
            if(move.step !== 0) {

              if(move.step < 0) { console.log('前进: ', move.step)}
              if(move.step > 0) { console.log('后退: ', move.step)}
              
              this.setState({
                axes,
                move: move.step,   
                moveX: this.state.moveX - this.state.move * Math.sin(this.state.rotate),
                moveZ: this.state.moveZ - this.state.move * Math.cos(this.state.rotate),
                isSecond: false,
                vrHeadModelPosition: VrHeadModel.position(),
              });
            }
            if(move.angle !== 0) {
              this.setState({
                axes,
                move: 0,
                rotate: this.state.rotate + move.angle,
                isSecond: false,
                vrHeadModelPosition: VrHeadModel.position(),
              })
            }
          }
          console.log('state: ', this.state);
          const axes = this.state.axes.concat([]);
          axes[e.axis] = e.value;
          this.setState({ 
              axes,
              forward: this.state.forward +( axes[1] > 0 ? 0.05 : -0.05),
              rotate: this.state.rotate + ( axes[0] > 0 ? -1 : 1),
              rotate: this.state.rotate - axes[0].toFixed(3) * 0.5,
           });
      }
    });
    */
    window.addEventListener('message', this.onWindowMessage); // 监听瞬移事件
    this.prePosition = props.initPosition;
  }

  componentWillMount() {
    this._isMounted = true;
    // console.log(rollerCoaster.getPoints());
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onWindowMessage = (e) => {
    // teleport to new position

    if (this._isMounted) {
      switch(e.data.type) {
        case 'newPosition': {
          const position = e.data.position;
          this.setState({
            teleportPosition: [position.x, 4, position.z],
          });
          break;
        }
        case 'rollerPosition': {
          const position = e.data.position;
          this.setState({
            rollerPosition: [position.x, position.y, position.z],
          });
          break;
        }
        case 'rollerRotation': {
          const rotation = e.data.rotation;
          this.setState({
            rollerRotation: [rotation.x, rotation.y, rotation.z],
          })
          break;
        }
      }
    }
  }

  render() {     
    // NativeModules.GetHeadModelModule.setHeadModelPosition(vrHeadModelPositionObj);
    // const { vrPosition = false, position = [0, 0, 0], reset = false, init = false, initPosition = [0, 0, 0]} = this.props;
 
    // console.log('curPos: ', curPosition);
    const { 
      enableTeleport = true,
      mode = 'home',
      // initPosition = [0, 0, 0],
      reset = false,
      resetPosition = [0, 0, 0],
      position = [0, 0, 0],    // position from jumping game 
    } = this.props;

    let transform = [];
    
    if (mode === 'home') {
      transform = [
        { translate: enableTeleport ? this.state.teleportPosition : this.state.initPosition }
      ];
    }

    if (mode === 'game-rollercoaster') {
      transform = [
        { translate: enableTeleport ? this.state.teleportPosition : this.state.rollerPosition},
        { rotateY: this.state.rollerRotation[1]}
      ];
    }

    if (mode === 'game-jumping') {
      // console.log(this.prePosition);
      const curPosition = reset ? resetPosition : [position[0] + this.prePosition[0], this.prePosition[1] + position[1], position[2] + this.prePosition[2]];
      this.prePosition = curPosition;
      transform = [
        { translate: enableTeleport ? this.state.teleportPosition : curPosition }
      ];
    }
    return (
      <View>     
        <Scene 
          style={{
            transform: transform,
          }}
        >                     
        </Scene> 
        {/* <RollerChair 
          style={{
            transform: [
              // { translate: !vrPosition ? this.state.cameraPosition : curPosition},
              // { rotateY:  this.state.cameraRotation[1] },                           //camera的旋转
            ],
          }}
        /> */}
      </View>
    )
  }
}