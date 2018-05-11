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
  VrHeadModel
} from 'react-vr';
import App from './src/routes/App';
import Chess from './src/routes/Chess';
import FoodShot from './src/routes/FoodShot';

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
  getIntoChess: {
    transform: [
      {translate: [3, 6, -15]},
    ],
  },
  getIntoFoodShot: {
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

let x = 0;
export default class zawa extends React.Component {
  constructor() {
    super();
    // window.addEventListener('message', this.onWindowMessage);
  }
  state = {
    mode: 'home',
    headPosition:[0,0,0],
    headRotation:[0,0,0],
    memberId: ''
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

    //事件绑定
    presenceChannel.bind('pusher:member_added', (member)=>{
      console.log(member.id)
    })
    presenceChannel.bind('pusher:subscription_succeeded',(members)=>{
      console.log('sucessConnect')
      setInterval(()=>{
        presenceChannel.trigger('client-headUpdate',{
          position:VrHeadModel.position(),
          rotation:VrHeadModel.rotation(),
          memberId:presenceChannel.members.me.id,
        })
      },500)
    })

    presenceChannel.bind('client-headUpdate',(data)=>{
      // console.log('VRhead: ',data)
      this.setState({
        headPosition: data.position,
        headRotation: data.rotation,
        memberId: data.memberId,
      })
    })


    pusher.connection.bind('connected',() => {
      this.socketId = pusher.connection.socket_id
      // console.log('connected: ', this.socketId);
    })    
  }

  handleClick(e) {
    this.setState({
      mode: 'home',
    })
  }
  
  render() {
    const mode = this.state.mode;
    const Position = this.state.headPosition;
    const Rotation = this.state.headRotation;
    const MemberId = this.state.memberId;
    return (
      // <Router>
        <View>
          {
            mode !== "home" ? null : 
            <View>
              <VrButton id="home" onClick={e => this.handleClick(e)}></VrButton>
              {/* {
                this.state.memberId=='' ? <App /> : <App AppPosition={Position} AppRotation={Rotation} AppMemberId={MemberId} />
              } */}
              <App AppPosition={Position} AppRotation={Rotation} AppMemberId={MemberId} />
              {/* <Route exact path="/" component={App}></Route> */}
            </View>
          }
          {
            mode !== 'game-chess' ? null :
            <View>
              <VrButton id="game-chess" onClick={e => this.handleClick(e)}></VrButton>
              <Chess />
              {/* <Route exact path="/" component={Chess} /> */}
            </View>
          }
          {
            mode !== 'game-foodshot' ? null :
            <View>
              <VrButton id="game-foodshot" onClick={ e => this.handleClick(e) }></VrButton>
              <FoodShot />
              {/* <Route exact path="/" component={FoodShot} /> */}
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
//         <Pano source={asset('chess-world.jpg')}/>
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
