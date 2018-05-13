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

let x = 0;
export default class zawa extends React.Component {
  constructor() {
    super();
    // window.addEventListener('message', this.onWindowMessage);
  }
  state = {
    mode: "game-jumping",
  }
  backHome() {
    this.setState({
      mode: 'home',
    })
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
              <VrButton 
                class="game-rollercoaster" 
                style={[
                  Styles.button,
                  Styles.getIntoRollerCoaster
                ]}
                onClick={ () => this.getIntoRollerCoaster() }>
                  <Text style={Styles.text}>ROLLERCOASTER</Text>
              </VrButton>
              <VrButton 
                class="game-jumping" 
                style={[
                  Styles.button,
                  Styles.getIntoJumping
                ]}
                onClick={ () => this.getIntoJumping() }>
                  <Text style={Styles.text}>JUMPING</Text>
              </VrButton>
              <Route exact path="/" component={App}></Route>
            </View>
          }
          {
            mode !== 'game-jumping' ? null :
            <View>
              <VrButton 
                class="home" 
                style={[
                  Styles.button,
                  Styles.backHome
                ]}
                onClick={ () => this.backHome() }>
                <Text style={Styles.text}>BACK</Text>
              </VrButton>
              <Route exact path="/" component={Jumping} />
            </View>
          }
          {
            mode !== 'game-rollercoaster' ? null :
            <View>
              <VrButton 
                class="home" 
                style={[
                  Styles.button,
                  Styles.backHome
                ]}
                onClick={ () => this.backHome() }>
                <Text style={Styles.text}>BACK</Text>
              </VrButton>
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
