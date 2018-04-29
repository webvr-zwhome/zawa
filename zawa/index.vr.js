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

export default class zawa extends React.Component {
  state = {
    mode: 'home',
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
