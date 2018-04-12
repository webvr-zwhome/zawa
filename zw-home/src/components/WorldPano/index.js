/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:01:09 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-12 23:19:16
 */
import React from 'react';
import { Pano } from 'react-vr';

export default class WorldPano extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { source } = this.props;
    return (
      <Pano source={source} />
    )
  }
}
