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
} from 'react-vr';

import ControllerState from '../ControllerState';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const styles = StyleSheet.create({
    waiting: {
      backgroundColor: 'black',
      fontSize: 0.3,
      layoutOrigin: [0.5, 0.5],
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      textAlignVertical: 'center',
      transform: [{translate: [0, 0, -3]}],
    },
    controllers: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      transform: [{translate: [0, 0, -3]}],
    },
});


const ControllerList = controllers => {
    if (controllers.length < 1) {
      return (
        <View style={{backgroundColor: 'black', padding: 0.2}}>
          <Text>No controllers</Text>
        </View>
      );
    }
    return controllers.map(c => <ControllerState key={c.index} controller={c} />);
};

export default class Room extends React.Component {

    constructor() {
        super();
        this.state = {
           controllers: null,
        }
    }

    render() {

        const INITIAL_X = -11;
        const INITIAL_Z = -23;
        const INITIAL_ROTATION = -90;
        return (
            <View>
                <Model
                    source={{
                        mtl: asset('room/room.mtl'),
                        obj: asset('room/room.obj'),
                    }}
                    style={{
                        transform: [
                            { translate: [INITIAL_X, 0, INITIAL_X]}, //初始化进入时的高度
                            { rotateY: INITIAL_ROTATION },         //矫正camera的视角
                        ],
                    }}
                >
                    {this.props.children}
                </Model>
            </View>    
        )
    }
}