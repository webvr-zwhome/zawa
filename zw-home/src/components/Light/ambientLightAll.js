/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:17:59 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-14 14:30:28
 */
import React from 'react';
import {
  Model,
  View,
  AmbientLight,
} from 'react-vr';

export default class AmbientLightAll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AmbientLight 
        intensity={ 1.2 }
        style={{
          // transform: [
          //   {translate: [0, 4, 0]}
          // ],
          color: "#fff",
        }}
        
      />
    )
  }
}