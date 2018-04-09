import React from 'react';
import {
  View,
  Model,
} from 'react-vr';

export default ({ style }) => (
  <View style={style}>
    <Model
      source={{ obj: asset('models/tree/tree-trunk.obj'), mtl: asset('models/tree/tree-trunk.mtl') }}
      lit={true}
      style={{ transform: [{scale: [0.6, 1, 0.6]}] }}
    />
    <Model
      source={{ obj: asset('models/tree/tree-crown.obj'), mtl: asset('models/tree/tree-crown.mtl') }}
      lit={true}
      style={{ transform: [{translate: [0, 2.5, 0]}] }}
    />
  </View>
);