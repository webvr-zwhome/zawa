import React from 'react';
// import { NativeRouter, Route, Link, Switch } from 'react-router-native';
// import createBrowserHistory from 'history/createBrowserHistory';

import { MemoryRouter as Router, Route, Link, Switch } from 'react-router';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  StyleSheet,
  VrHeadModel,
  NativeModules,
} from 'react-vr';
import App from './src/routes/App';
import Jumping from './src/routes/Jumping';
import RollerCoasterGame from './src/routes/RollerCoaster';
// import Button from './src/components/Button';
// import Panel from './src/components/Panel';
// const rollerCoaster = NativeModules.RollerCoaster;


const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

// const history = createBrowserHistory();
//pusher
importScripts('https://js.pusher.com/4.1/pusher.worker.min.js');


var Styles = StyleSheet.create({
  button: {
    backgroundColor: '#777879',
    borderRadius: 0.2,
    borderWidth: 0.01,
    borderColor: '#7b612f',
    flex: 1,
    flexDirection: 'column',
    width: 2,
    height: 0.5,
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
  }
});

export default class zawa extends React.Component {
  constructor() {
    super();
    // window.addEventListener('message', this.onWindowMessage);
    // RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
      // if (e.type !== 'GamepadInputEvent') {
      //   return;
      // }
      // console.log(e);
      // if (e.gamepad === 0 && e.button === 1 && e.eventType === 'keydown') {

      // }
      // if (e.eventType === 'keydown') {
      //   const buttons = this.state.buttons.concat([]);
      //   buttons[e.button] = true;
      //   this.setState({buttons});
      // } else if (e.eventType === 'keyup') {
      //   const buttons = this.state.buttons.concat([]);
      //   buttons[e.button] = false;
      //   this.setState({buttons});
      // } else if (e.eventType === 'axismove') {
      //   const axes = this.state.axes.concat([]);
      //   axes[e.axis] = e.value;
      //   this.setState({axes});
      // }
    // });
  }
  state = {
    mode: 'home',
    // headPosition:[0,0,0],
    // headRotation:[0,0,0],
    // memberId: ''
  }

  //pusher
  componentWillMount(){
    const pusher = new Pusher('0b6e86e935ef11ade5df',{
      authEndpoint:'http://123.206.180.98:5000/pusher/auth',
      auth: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':'Content-Type, Authorization'
        }
      },
      cluster: 'ap1',
      encrypted: true
    })

    this.socketId = null;
    
    //   fetch('http://127.0.0.1:5000/pusher/trigger', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     socketId: this.socketId,
    //     channelId: this.channelId,
    //   })
    // });
    // })

    // this.channelId ='channel-' + document.getElementById('MyID').value
    // this.channelId = 'channel-1234';
    // console.log('channelId: ',this.channelId)
    // const channel = pusher.subscribe(this.channelId)

    // channel.bind('my-event',(data) => {
    //   console.log('data: ',data)
    //   alert(data.message)
    // })

    // presence channel
    this.presenceChannelName = 'presence-1234'
    const presenceChannel = pusher.subscribe(this.presenceChannelName);
    // presenceChannel = pusher.subscribe(this.presenceChannelName);

    //事件绑定
    // presenceChannel.bind('pusher:member_added', (member)=>{
    //   console.log(member.id)
    // })
    // presenceChannel.bind('pusher:subscription_succeeded',(members)=>{
    //   console.log('sucessConnect')
    //   // setInterval(()=>{
    //   //   this.presenceChannel.trigger('client-headUpdate',{
    //   //     position:VrHeadModel.position(),
    //   //     rotation:VrHeadModel.rotation(),
    //   //     memberId:presenceChannel.members.me.id,
    //   //   })
    //   // },500)
    // })
    this.preChannel = presenceChannel
    

    // this.presenceChannel.bind('client-headUpdate',(data)=>{
    //   // console.log('VRhead: ',data)
    //   this.setState({
    //     headPosition: data.position,
    //     headRotation: data.rotation,
    //     memberId: data.memberId,
    //   })
    // })


    pusher.connection.bind('connected',() => {
      this.socketId = pusher.connection.socket_id
      console.log('connected: ', this.socketId);
    })    
  }

  // handleClick(e) {
  //   this.setState({
  //     mode: 'home',
  //   })
  // }
  
  backHome() {
    this.setState({
      mode: 'home',
    });
  }

  getIntoJumping() {
    this.setState({
      mode: 'game-jumping',
    });
  }

  getIntoRollerCoaster() {
    this.setState({
      mode: 'game-rollercoaster',
    });
  }

  render() {
    const Channel = this.preChannel;
    const mode = this.state.mode;
    // const Position = this.state.headPosition;
    // const Rotation = this.state.headRotation;
    // const MemberId = this.state.memberId;
    return (
      // <Router>
        <View>
          {
            mode !== "home" ? null : 
            <View>
              {/* <VrButton id="home" onClick={e => this.handleClick(e)}></VrButton> */}
              {/* <App AppChannel={Channel} /> */}
              <App 
                AppChannel={Channel}
                onEnterJumping={() => this.getIntoJumping()}
                onEnterRollerCoaster={() => this.getIntoRollerCoaster()}
                onBackHome={() => this.backHome()}
              />
              {/* <Route exact path="/" component={App}></Route> */}
            </View>
          }
          {
            mode !== 'game-jumping' ? null :
            <View>
              {/* <VrButton id="game-chess" onClick={e => this.handleClick(e)}></VrButton> */}
              {/* <Chess /> */}
              <Jumping 
                  onEnterJumping={() => this.getIntoJumping()}
                  onEnterRollerCoaster={() => this.getIntoRollerCoaster()}
                  onBackHome={() => this.backHome()}
              />
            </View>
          }
          {
            mode !== 'game-rollercoaster' ? null :
            <View>
              {/* <VrButton id="game-foodshot" onClick={ e => this.handleClick(e) }></VrButton> */}
              {/* <FoodShot /> */}
              <RollerCoasterGame 
                onEnterJumping={() => this.getIntoJumping()}
                onEnterRollerCoaster={() => this.getIntoRollerCoaster()}
                onBackHome={() => this.backHome()}
              />
              {/* <Route exact path="/" component={RollerCoasterGame} /> */}
            </View>
          }
        </View>
      // </Router>
    );
  }
};

// export default class zawa extends React.Component {
//   render() {
//     return (
//       <View>
//         <Pano source={asset('jumping-world.jpg')}/>
//         <Text
//           style={{
//             backgroundColor: '#777879',
//             fontSize: 0.8,
//             fontWeight: '400',
//             layoutOrigin: [0.5, 0.5],
//             paddingLeft: 0.2,
//             paddingRight: 0.2,
//             textAlign: 'center',
//             textAlignVertical: 'center',
//             transform: [{translate: [0, 0, -3]}],
//           }}>
//           hello
//         </Text>
//       </View>
//     );
//   }
// };

AppRegistry.registerComponent('zawa', () => zawa);
