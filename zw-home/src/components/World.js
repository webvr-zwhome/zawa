/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 22:54:45 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-13 00:30:28
 */
import React from 'react';
import {
  View,
  Pano,
  asset,
} from 'react-vr';
import WorldPano from './WorldPano';
import WorldPlane from './WorldPlane';
import Tree from './Tree';

// 世界由天空、森林、地面组成, 作为Home的外层包裹
export default class World extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    size: 100,  // 树的数量
  }

  randomPosition() {
    const pos = Math.floor(Math.random() * 100 - 50);
    return (pos > -40 && pos < 40) ? (pos <= 0 ? pos -40 : pos + 40) : pos;
  }

  randomScale() {
    return (Math.random() * 5);
  }

  randomHeight() {
    return (Math.random() + 0.5);
  }

  generateForest(size) {
    const forest = [];
    for(let i = 0; i < size; i++) {
      forst.push({
        x: this.randomPosition(),
        y: this.randomPosition(),
        height: this.randomHeight(),
        scale: this.randomScale(),
      })
    }
    return forest;
  }

  render() {
    const { size } = this.props;
    const forest = this.generateForest(size);
    return (
      <View>
        <WorldPano source={asset('heaven.png')} />
        {
          forest.map((tree, index) => (
            <Tree 
              key={index}
              x={tree.x}
              y={tree.y}
              height={tree.height}
              scale={tree.scale}
            />
          ))
        }
        { this.props.children }
        <WorldPlane position={[0, 0, 0]}/>
      </View>
    )
  }
}