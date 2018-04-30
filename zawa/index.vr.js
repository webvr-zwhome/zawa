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
} from 'react-vr';
import App from './src/routes/App';
import Chess from './src/routes/Chess';
import FoodShot from './src/routes/FoodShot';

// const history = createBrowserHistory();
//pusher
importScripts('https://js.pusher.com/4.1/pusher.worker.min.js');


export default class zawa extends React.Component {
  state = {
    mode: 'home',
  }

  //pusher
  componentWillMount(){
    const pusher = new Pusher('0b6e86e935ef11ade5df',{
      cluster: 'ap1',
      encrypted: true
    })

    this.socketId = null;
    pusher.connection.bind('connected',() => {
      this.socketId = pusher.connection.socket_id
      console.log('connected: ', this.socketId)

      fetch('http://127.0.0.1:5000/pusher/trigger', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socketId: this.socketId,
        channelId: this.channelId,
      })
    });
    })

    // this.channelId ='channel-' + document.getElementById('MyID').value
    this.channelId = 'channel-1234';
    console.log('channelId: ',this.channelId)
    const channel = pusher.subscribe(this.channelId)

    channel.bind('my-event',(data) => {
      console.log('data: ',data)
      alert(data.message)
    })

    // fetch('http://127.0.0.1:5000/pusher/trigger', {
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
  }

  handleClick(e) {
    this.setState({
      mode: e.target.id,
    })
  }
  render() {
    const mode = this.state.mode;
    return (
      <Router>
        <View>
          {
            mode !== "home" ? null : 
            <View>
              <VrButton id="home" onClick={e => this.handleClick(e)}></VrButton>
              <Route exact path="/" component={App}></Route>
            </View>
          }
          {
            mode !== 'game-chess' ? null :
            <View>
              <VrButton id="game-chess" onClick={e => this.handleClick(e)}></VrButton>
              <Route exact path="/" component={Chess} />
            </View>
          }
          {
            mode !== 'game-foodshot' ? null :
            <View>
              <VrButton id="game-foodshot" onClick={ e => this.handleClick(e) }></VrButton>
              <Route exact path="/" component={FoodShot} />
            </View>
          }
        </View>
      </Router>
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
