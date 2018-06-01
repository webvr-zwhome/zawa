/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-06-01 15:56:08 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-06-01 23:46:07
 */
import React from 'react';
import { 
  Model,
  asset,
} from 'react-vr';

export default class RollerChair extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { position = [ 50, 0, 0 ], rotation = 180 } = this.props;
    return (
      <Model 
        source={{
          obj: asset('models/rollerchair.obj'),
          mtl: asset('models/rollerchair.mtl'),
          }}
        style={{
          transform: [
            { translate: position },
            { rotateY: rotation },
            { scale: [10, 20, 20] },
          ]
        }}
        lit={true}
      />
    )
  }
}
