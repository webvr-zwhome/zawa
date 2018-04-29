/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:17:33 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-14 14:46:52
 */
import React from 'react';
import {
  View,
  Model,
  asset,
} from 'react-vr';

export default class Tree extends React.Component{
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    x: 0,
    y: 0,
    height: 1,
    scale: 1,
  }

  render() {
    const { x, y, height, scale } = this.props;
    return (
      <View
        style={{
          transform: [
            {translate: [x, -1, y]},
            {scale: [scale, scale + height, scale]},

          ]
        }}
      >
        <Model
          source={{ 
            obj: asset('models/tree/tree-crown.obj'), 
            mtl: asset('models/tree/tree-crown.mtl') 
          }}
          lit={true}
          style={{ 
            transform: [
              // {scale: [scale, scale, scale + height]},
              {translate:[0, 2, 0]}
            ] 
          }}
        />
        <Model
          source={{ 
            obj: asset('models/tree/tree-trunk.obj'), 
            mtl: asset('models/tree/tree-trunk.mtl') 
          }}
          lit={true}
          style={{ 
            transform: [
              // {scale: [scale, scale, scale + height]},
              {translate:[0, 0, 0]}
            ] 
          }}
        />
        
      </View>
    )
  }
}


// export default ({ style }) => (
//   <View style={style}>
//     <Model
//       source={{ obj: asset('models/tree/tree-trunk.obj'), mtl: asset('models/tree/tree-trunk.mtl') }}
//       lit={true}
//       style={{ transform: [{scale: [0.6, 1, 0.6]}] }}
//     />
//     <Model
//       source={{ obj: asset('models/tree/tree-crown.obj'), mtl: asset('models/tree/tree-crown.mtl') }}
//       lit={true}
//       style={{ transform: [{translate: [0, 2.5, 0]}] }}
//     />
//   </View>
// );