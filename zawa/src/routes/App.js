/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-06 21:25:21
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
  Sphere,
  VrHeadModel,
} from 'react-vr';

import Camera from '../components/Camera';
import Home from '../components/Home';
import Tree from '../components/Tree';
// import AmbientLightAll from '../components/Light/ambientLightAll'; 
import World from '../components/World';
import Human from '../components/Human';
import Hoster from '../components/Human/Hoster';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    // this.state = {
    //   // position = this.props.AppPosition,
    //   // rotation = this.props.AppRotation,
    //   // memberId = this.props.AppMemberId,
    //   memberList : {}
    // }
    this.memberList = {}
    this.addMember = this.addMember.bind(this);
    this.updateMember = this.updateMember.bind(this)
  }

  addMember(memberId,position,rotation) {
    const member = {};
    member.position = position;
    member.rotation = rotation;
    const memberAdd = {};
    memberAdd[memberId] = member;
    // const memberAdd = {
    //   memberId: member
    // };
    // const newMemberList =  Object.assign({},this.memberList,memberAdd);
    // this.setState({
    //   memberList: Object.assign({},newMemberList) 
    // })
    this.memberList =  Object.assign({},this.memberList,memberAdd);
    
  }
  
  updateMember(memberId,position,rotation){
    // const memberUpdate = Object.assign({},this.memberList);
    // memberUpdate[memberId]["position"] = position;
    // memberUpdate[memberId]["rotation"] = rotation;
    // this.setState({
    //   memberList: Object.assign({},memberUpdate)
    // })
    // this.memberList = Object.assign({},memberUpdate)
    this.memberList[memberId]["position"] = position;
    this.memberList[memberId]["rotation"] = rotation;
  }

  render() {
    let list = null;
    if(this.props.AppMemberId){
      this.memberList.hasOwnProperty(this.props.AppMemberId) ? 
      this.updateMember(
        this.props.AppMemberId, 
        this.props.AppPosition, 
        this.props.AppRotation
      ) :
      this.addMember(
        this.props.AppMemberId, 
        this.props.AppPosition, 
        this.props.AppRotation
      );
      const keyArr = Object.keys(this.memberList);
      // console.log('memberList: ',this.memberList)
      const newMemList = Object.assign({},this.memberList);
      list = keyArr.map((memkey, index) => {
        return <Human 
          key={index}
          HumanId={memkey} 
          HumanPosition={newMemList[memkey]["position"]} 
          HumanRotation={newMemList[memkey]["rotation"]} />
      })
    }
    
    return (
      <View>
        {/* <AmbientLightAll /> */}
        <Camera />
        <World  />
          
        {/* </World> */}
        <Home />
          {/* <Human></Human> */}
          <Hoster />
          {list}
      </View> 
    )
  }
}