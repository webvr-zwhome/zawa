/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:18:16 
 * @Last Modified by:   zhaoxiaoqi 
 * @Last Modified time: 2018-04-12 23:18:16 
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


export default class Camera extends React.Component {

  constructor() {
    super();
    this.state = {
      buttons: [],     // 手柄按键
      axes: [],        // 手柄遥杆
      viewportX: 0,    // 鼠标X
      viewportY: 0,    // 鼠标Y
      move: 0,         // 前后移动偏移量 清零计算
      moveX: 0,        // 世界坐标camera的x轴位置
      moveZ: 0,        // 世界坐标camera的z轴位置
      rotate: 0,       // 左右旋转值 叠加计算
      isSecond: false, // 针对手柄，手柄摇杆的横纵向值不是同时检测
      vrHeadModelPosition: [0, 0, 0],
      cameraPosition: [0, 0, 0],
    }
    let preAxes = [];
      
    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {     
      // if (e.type !== 'MouseInputEvent' && e.type !== 'KeyboardInputEvent') 
      // {console.log('e1', e);}
      // 【mouse + shift】控制漫游
      if (e.eventType === 'mousemove' && e.shiftKey) {

        const preX = this.state.viewportX;
        const preY = this.state.viewportY;

        const move = cameraMove(preX, preY, e.viewportX, e.viewportY);
        
        if(move.step !== 0) {

            // if(move.step < 0) { console.log('前进: ', move.step)}
            // if(move.step > 0) { console.log('后退: ', move.step)}
            
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

          // if(move.angle > 0) { console.log('左转: ', move.angle)}
          // if(move.angle < 0) { console.log('右转: ', move.angle)}

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
      // if (e.eventType === 'keydown') {
      //     const buttons = this.state.buttons.concat([]);
      //     buttons[e.button] = true;
      //     this.setState({buttons});
      // } else if (e.eventType === 'keyup') {
      //     const buttons = this.state.buttons.concat([]);
      //     buttons[e.button] = false;
      //     this.setState({buttons});
      // } 

      // 左手柄摇杆控制漫游
      if (e.gamepad === 0 && e.eventType === 'axismove') {

        // console.log('e2', e);   
        const axes = this.state.axes.slice(); //当前摇杆的值的数组
        // if(!this.state.isSecond) {
        //     axes[e.axis] = e.value;
        // }
      
        if (e.axis === 0) {
            // preAxis0 = this.state.axes[0];   // 0-横向摇杆控制左右旋转
            // preAxis1 = this.state.axes[1];   // 1-纵向摇杆控制前后移动
            preAxes = this.state.axes;
            axes[0] = e.value;  //先获得摇杆横向的值
            // console.log('获取第一个数: ', axes);
            this.setState({
                axes,
                isSecond: true,
            })
          } else if (this.state.isSecond && e.axis === 1) {

            axes[1] = e.value;
            // console.log('获取第二个数: ', axes);
            const move = cameraMove(preAxes[0], preAxes[1], axes[0], axes[1]);
            if(move.step !== 0) {

              // if(move.step < 0) { console.log('前进: ', move.step)}
              // if(move.step > 0) { console.log('后退: ', move.step)}
              
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

              // if(move.angle > 0) { console.log('左转: ', move.angle)}
              // if(move.angle < 0) { console.log('右转: ', move.angle)}

              this.setState({
                axes,
                move: 0,
                rotate: this.state.rotate + move.angle,
                isSecond: false,
                vrHeadModelPosition: VrHeadModel.position(),
              })
            }
          }
          // console.log('state: ', this.state);
          // const axes = this.state.axes.concat([]);
          // axes[e.axis] = e.value;
          // this.setState({ 
          //     axes,
          //     // forward: this.state.forward +( axes[1] > 0 ? 0.05 : -0.05),
          //     // rotate: this.state.rotate + ( axes[0] > 0 ? -1 : 1),
          //     // rotate: this.state.rotate - axes[0].toFixed(3) * 0.5,
          //  });
      }
    });
    window.addEventListener('message', this.onWindowMessage);
  }

  onWindowMessage = (e) => {
    // if (x < 50) {
    //   console.log('1', e.data);
    //   x++;
    // }
    if (e.data.type == "newPosition") {
      console.log('2');
      console.log(e.data.position);
      const position = e.data.position;
      this.setState({
        cameraPosition:  [position.x, 4, position.z],
      })
    }
  }

  render() {     
    //camera的初始位置、方向、高度
    const INITIAL_X = 0;  
    const INITIAL_Z = 0;
    const INITIAL_ROTATION = 0;
    const CAMERA_HEIGHT = 5.5;

    const moveX = this.state.moveX;
    const moveZ = this.state.moveZ;
    const rotate = this.state.rotate;
    
    // console.log('mX: ', moveX);
    // console.log('headmodel:',VrHeadModel.position());
    // console.log('mZ: ', moveZ);
    // console.log('.......................');

    let vrHeadModelPositionObj = {
      x: this.state.vrHeadModelPosition[0],
      y: this.state.vrHeadModelPosition[1],
      z: this.state.vrHeadModelPosition[2],
      rotate: this.state.rotate,
    }
      // NativeModules.GetHeadModelModule.setHeadModelPosition(vrHeadModelPositionObj);
    return (
      <View>     
        <Scene 
          style={{
            transform: [
              { translate: this.state.cameraPosition},
              // { translate: [moveX, CAMERA_HEIGHT, moveZ]},    //camera的位置
              { rotateY:  rotate },                           //camera的旋转
            ],
          }}
        >                     
        </Scene> 
      </View>
    )
  }
}