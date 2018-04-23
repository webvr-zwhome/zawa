/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-23 23:08:48 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-23 23:33:48
 */
import React from 'react';
import {
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
  Sphere,
} from 'react-vr';

import { getFoodUrl } from './utils';

export default class Food extends React.Component {
  render() {
    const food = getFoodUrl();
    return(
      <View>
        <Model
          source={{ 
            obj: asset(food.obj), 
            mtl: asset(food.mtl) 
          }}
          lit={true}
          style={{ 
            transform: [
              {translate:[0, 8, -18]}
            ] 
          }}
        />
      </View>
    )
  }
}