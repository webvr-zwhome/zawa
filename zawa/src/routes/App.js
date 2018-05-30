/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-30 11:37:54
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
  DirectionalLight,
  AmbientLight,
} from 'react-vr';

import Camera from '../components/Camera';
import Home from '../components/Home';
import Tree from '../components/Tree';
import AmbientLightAll from '../components/Light/ambientLightAll'; 
import World from '../components/World';
import {HumanList} from '../components/Human';
// import Hoster from '../components/Human/Hoster';
import Human from '../components/Human';
import Panel from '../components/Panel';
// import Hoster from '../components/Human/Hoster';
const rollerCoaster = NativeModules.RollerCoaster;

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
    this.updateMember = this.updateMember.bind(this);
    rollerCoaster.hide(false);
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
    // let list = null;
    // if(this.props.AppMemberId){
    //   this.memberList.hasOwnProperty(this.props.AppMemberId) ? 
    //   this.updateMember(
    //     this.props.AppMemberId, 
    //     this.props.AppPosition, 
    //     this.props.AppRotation
    //   ) :
    //   this.addMember(
    //     this.props.AppMemberId, 
    //     this.props.AppPosition, 
    //     this.props.AppRotation
    //   );
    //   const keyArr = Object.keys(this.memberList);
    //   // console.log('memberList: ',this.memberList)
    //   const newMemList = Object.assign({},this.memberList);
    //   list = keyArr.map((memkey, index) => {
    //     return <Human 
    //       key={index}
    //       HumanId={memkey} 
    //       HumanPosition={newMemList[memkey]["position"]} 
    //       HumanRotation={newMemList[memkey]["rotation"]} />
    //   })
    // }

    const humanChannel = this.props.AppChannel;
    
    const { 
      onEnterJumping,
      onEnterRollerCoaster,
      onBackHome,
    } = this.props;
    return (
      <View>
      <AmbientLight 
        intensity={ 1 }
        style={{
          transform: [
            {translate: [0, 0, 0]}
          ],
          color: "#fff",
        }} 
      />        
      {/* <DirectionalLight
          style={{
            transform:[
              {translate: [0, 1000, 100]},
              {rotateX: -45}
            ]
          }} 
          intensity={1.0}  
        >
        </DirectionalLight> */}
        <Panel 
            mode={'home'}
            onEnterJumping={() => onEnterJumping()}
            onEnterRollerCoaster={() => onEnterRollerCoaster()}
            onBackHome={() => onBackHome()}
            onStartJumping={() => {}}
            onStartRollerCoaster={() => {}}
        />
        <Camera reset={true}/>
        <World />
          
        {/* </World> */}
        <Home />
        {/* <Human /> */}
        {/* <Hoster /> */}
        {/* {list} */}
        <HumanList HumanChannel={humanChannel} />
      </View> 
    )
  }
}