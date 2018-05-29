/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:01:09 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-16 21:09:19
 */
import React from 'react';
import { 
  Model,
  asset,
} from 'react-vr';

export default class WorldPlane extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { position, source = {
      obj: asset('models/plane/plane.obj'),
      mtl: asset('models/plane/plane.mtl'),
    } } = this.props;
    return (
      <Model 
        source={ source }
        style={{
          transform: [
            { translate: position },
            { scale: 10 }
          ]
        }}
        lit={true}
      />
    )
  }
}
