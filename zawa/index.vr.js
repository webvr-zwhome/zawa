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
import Chess from './src/routes/Chess';
import FoodShot from './src/routes/FoodShot';

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
    mode: "home",
  }

 
  
  backHome() {
    this.setState({
      mode: 'home',
    })
  }

  getIntoChess() {
    this.setState({
      mode: 'game-chess',
    });
  }

  getIntoFoodShot() {
    this.setState({
      mode: 'game-foodshot',
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
                class="game-foodshot" 
                style={[
                  Styles.button,
                  Styles.getIntoFoodShot
                ]}
                onClick={ () => this.getIntoFoodShot() }>
                  <Text style={Styles.text}>FOODSHOT</Text>
              </VrButton>
              <VrButton 
                class="game-chess" 
                style={[
                  Styles.button,
                  Styles.getIntoChess
                ]}
                onClick={ () => this.getIntoChess() }>
                  <Text style={Styles.text}>CHESS</Text>
              </VrButton>
              <Route exact path="/" component={App}></Route>
            </View>
          }
          {
            mode !== 'game-chess' ? null :
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
              <Route exact path="/" component={Chess} />
            </View>
          }
          {
            mode !== 'game-foodshot' ? null :
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
