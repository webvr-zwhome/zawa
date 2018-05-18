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
              this.Channel.trigger('client-headUpdated',{
                position: VrHeadModel.position(),
                rotation: VrHeadModel.rotation(),
                memberId: this.Channel.members.me.id,
              })
            },300)
          })

        this.Channel.bind('client-headUpdated',(data)=>{
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
        this.memberList =  Object.assign({},this.memberList,memberAdd);
        
    }
      
    updateMember(memberId,position,rotation){
        this.memberList[memberId]["position"] = position;
        this.memberList[memberId]["rotation"] = rotation;
    }

    render() {
        const position = this.state.headPosition.slice();
        const rotation = this.state.headRotation.slice();
        const userName = this.state.memberId;
        let list = null;
        // console.log('position: ',position)
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
