/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-06-01 15:56:08 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-06-02 21:19:07
 */
import React from 'react';
import { 
  Model,
  asset,
} from 'react-vr';

export default class RollerStart extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    // const { position } = this.props;
    return (
      <Model 
        source={{
          obj: asset('models/rollerstart.obj'),
          mtl: asset('models/rollerstart.mtl'),
          }}
        style={{
          transform: [
            { translate: [50, -5, -20] },
            { rotateY: 90 },
            { scale: [ 3, 1.5, 1 ] }
          ]
        }}
        lit={true}
      />
    )
  }
}
