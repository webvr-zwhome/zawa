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
} from 'react-vr';
import App from './src/routes/App';
import Chess from './src/routes/Chess';
import FoodShot from './src/routes/FoodShot';

// const history = createBrowserHistory();

export default class zw_home extends React.Component {
  render() {
    return (
      <Router>
        <View>
        {/* <Switch> */}
          {/* <Route exact path="/" component={App} />
          <Route exact path="/chess" component={Chess} /> */}
          <Route exact path="/" component={FoodShot} />
        {/* </Switch> */}
        </View>
      </Router>
    );
  }
};

// export default class zw_home extends React.Component {
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

AppRegistry.registerComponent('zw_home', () => zw_home);
