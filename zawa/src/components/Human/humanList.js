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
//引入人物模型
import Human from './human';

export default class  HumanList extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            headPosition: [0, 0, 0],
            headRotation: [0, 0, 0],
            memberId: ''
        }
        this.Channel = this.props.HumanChannel;        
        this.memberList = {}
        this.addMember = this.addMember.bind(this);
        this.updateMember = this.updateMember.bind(this)
    }
    componentWillMount(){

        this.Channel.bind('pusher:subscription_succeeded',(members)=>{
            console.log('Render headmodel')
            setInterval(()=>{
              this.Channel.trigger('client-headUpdate',{
                position: VrHeadModel.position(),
                rotation: VrHeadModel.rotation(),
                memberId: this.Channel.members.me.id,
              })
            },500)
          })

          this.Channel.bind('client-headUpdate',(data)=>{
            // console.log('VRhead: ',data)
            this.setState({
              headPosition: data.position,
              headRotation: data.rotation,
              memberId: data.memberId,
            })
          })
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
        const position = this.state.headPosition;
        const rotation = this.state.headRotation;
        const userName = this.state.memberId;
        let list = null;

        if(userName){
        this.memberList.hasOwnProperty(userName) ? 
        this.updateMember(
            userName, 
            position, 
            rotation
        ) :
        this.addMember(
            userName, 
            position, 
            rotation
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
                {list}            
            </View>
        )
    }
}
