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
} from 'react-vr';
import App from './src/routes/App';
import Jumping from './src/routes/Jumping';
import RollerCoaster from './src/routes/RollerCoaster';
import Button from './src/components/Button';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

// const history = createBrowserHistory();

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
    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
      if (e.type !== 'GamepadInputEvent') {
        return;
      }
      // console.log(e);
      if (e.gamepad === 0 && e.button === 1 && e.eventType === 'keydown') {

      }
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
    });
  }
  state = {
    mode: "game-jumping",
  }
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
    const mode = this.state.mode;
    return (
      <Router>
        <View>
          {
            mode !== "home" ? null : 
            <View>
              <Button 
                style={Styles.getIntoRollerCoaster}
                index={0}
                button={3}
                eventType={'keydown'}
                onEvent={() => this.getIntoRollerCoaster()}>
                <Text style={Styles.text}>ROLLERCOASTER</Text>
              </Button>
              <Button 
                style={Styles.getIntoJumping}
                index={0}
                button={3}
                eventType={'keydown'}
                onEvent={() => this.getIntoJumping()}>
                <Text style={Styles.text}>JUMPING</Text>
              </Button>
              <Route exact path="/" component={App}></Route>
            </View>
          }
          {
            mode !== 'game-jumping' ? null :
            <View>
              <Button 
                style={Styles.backHome}
                index={0}
                button={3}
                eventType={'keydown'}
                onEvent={() => this.backHome()}>
                <Text style={Styles.text}>BACK</Text>
              </Button>
              <Route exact path="/" component={Jumping} />
            </View>
          }
          {
            mode !== 'game-rollercoaster' ? null :
            <View>
                <Button 
                  style={Styles.backHome}
                  index={0}
                  button={3}
                  eventType={'keydown'}
                  onEvent={() => this.backHome()}>
                  <Text style={Styles.text}>BACK</Text>
                </Button>
              <Route exact path="/" component={RollerCoaster} />
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
