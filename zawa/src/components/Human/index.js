/*
 * @Author: penghuiwu 
 * @Date: 2018-05-01 13:54:51 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-07 11:44:09
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
    constructor(props){
        super(props);
        this.state = {
            position: [0,0,0],
            rotation: [0,0,0]
            // headPosition: [0, 5.2, -7],
            // headRotation: [0, 0, 0],
            // bodyPosition: [0, 4, -7],
           
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
        // that = this;
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
        if(!this.props.HumanId){
            headExist =  setInterval(()=>{
                const VHposition = VrHeadModel.position();
                const VHrotation = VrHeadModel.rotation();
                this.setState({
                    // headPosition: [position[0],position[1]-1,position[2]],
                    // headRotation: rotation,
                    // bodyPosition: [position[0],position[1]-2,position[2]]
                    position: VHposition,
                    rotation: VHrotation
                })
            },  200)
        }
    }


    render() {
        let headTran = [];
        let headRotate = [];
        if(this.props.HumanId){
            // position[0] = this.props.HumanPosition[0];
            // position[1] = this.props.HumanPosition[1];
            // position[2] = this.props.HumanPosition[2];
            // rotation[0] = this.props.HumanRotation[0];
            // rotation[1] = this.props.HumanRotation[1];
            // rotation[2] = this.props.HumanRotation[2];
            headTran = this.props.HumanPosition.slice();
            // bodyTran = this.props.HumanPosition.slice();
            // headTran[1] -= 1;
            // bodyTran[1] -= 2;
            headRotate = this.props.HumanRotation.slice();
            // console.log('headTran: ',headTran);
        }else{
            // headTran = this.state.headPosition.slice();
            // bodyTran = this.state.bodyPosition.slice();
            headTran = this.state.position.slice();
            headRotate = this.state.rotation.slice();
        }
        // const position = this.state.position;
        // const rotation = this.state.rotation;
        // console.log(position);
        // console.log(VrHeadModel.rotation());
        return(
            <View
                style={{
                    transform: [
                        {translate: headTran}
                    ]
                }}
            >
                {/* head */}
                <Model
                    source={{
                        mtl: asset('models/human/head.mtl'),
                        obj: asset('models/human/head.obj'),
                      }}
                      style={{
                        transform: [
                            { translate: [0, -0.25, 0.2]}, //初始化进入时的高度
                            { rotateX: headRotate[0] },         //矫正camera的视角
                            { rotateY: headRotate[1] },         //矫正camera的视角
                            { rotateZ: headRotate[2] },         //矫正camera的视角,
                            {scale: 0.1}
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
                            { translate: [0,-0.3,0.2] }, //初始化进入时的高度
                            //{ rotateX: rotation[0] },         //矫正camera的视角
                            { rotateY: headRotate[1] },         //矫正camera的视角
                            //{ rotateZ: rotation[2] },         //矫正camera的视角
                            {scale: 0.1}
                        ],
                      }}
                    //   lit={true}
                >
                </Model>
            </View>
        );
    }
}