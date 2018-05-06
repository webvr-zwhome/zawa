/*
 * @Author: penghuiwu 
 * @Date: 2018-05-01 13:54:51 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-06 14:41:02
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
  VrHeadModel,
} from 'react-vr';
// import TimerMixin from 'react-timer-mixin';


const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


export default class Human extends React.Component {
    // mixins: [TimerMixin]
    constructor(){
        super();
        this.state = {
            headPosition: [0, 5.2, -7],
            headRotation: [0, 0, 0],
            bodyPosition: [0, 4, -7],
            bodyRotation: [0, 0, 0],
        //     rotateX: 0,
        //     rotateY: 0,
        //     rotateZ: 0
        }
    }
    // shouldComponentUpdate () {
    //     var position = VrHeadModel.position();
    //     var rotation = VrHeadModel.rotation();

    //     return (position !== this.state.position || rotation !== this.state.rotation);
    // }

    componentDidMount () {
        that = this;
        let headExist = null;
        // if(VrHeadModel.getVRStatus()){
        //     headExist =  setInterval(()=>{
        //         var position = VrHeadModel.position();
        //         var rotation = VrHeadModel.rotation();
        //         this.setState({
        //             headPosition: position,
        //             headRotation: rotation,
        //             bodyPosition: [position[0],position[1]-1,position[2]]
        //         })
        //     },  300)
        // }else{
        //     clearInterval(headExist);
        // }
        headExist =  this.setInterval(()=>{
            const position = VrHeadModel.position();
            const rotation = VrHeadModel.rotation();
            that.setState({
                headPosition: position,
                headRotation: rotation,
                bodyPosition: [position[0],position[1]-1,position[2]]
            })
        },  500)
    }


    render() {

        // const position = this.state.position;
        // const rotation = this.state.rotation;
        // console.log(position);
        // console.log(VrHeadModel.rotation());
        return(
            <View>
                {/* head */}
                <Model
                    source={{
                        mtl: asset('models/human/head.mtl'),
                        obj: asset('models/human/head.obj'),
                      }}
                      style={{
                        transform: [
                            { translate: this.state.headPosition}, //初始化进入时的高度
                            { rotateX: this.state.headRotation[0] },         //矫正camera的视角
                            { rotateY: this.state.headRotation[1] },         //矫正camera的视角
                            { rotateZ: this.state.headRotation[2] },         //矫正camera的视角,
                            {scale: 0.5}
                        ],
                      }}
                    //   lit={true}
                >
                </Model>
                {/* body */}
                <Model
                    source={{
                        mtl: asset('models/human/body.mtl'),
                        obj: asset('models/human/body.obj'),
                      }}
                      style={{
                        transform: [
                            { translate: this.state.bodyPosition }, //初始化进入时的高度
                            { rotateX: this.state.bodyRotation[0] },         //矫正camera的视角
                            { rotateY: this.state.bodyRotation[1] },         //矫正camera的视角
                            { rotateZ: this.state.bodyRotation[2] },         //矫正camera的视角
                            {scale: 0.5}
                        ],
                      }}
                    //   lit={true}
                >
                </Model>
            </View>
        );
    }
}