/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 22:54:45 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-13 21:10:25
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
    sky: asset('heaven.png'),
    size: 100,  // 树的数量
  }

  randomPosition() {
    let x = Math.floor(Math.random() * 100 - 50);
    let y = Math.floor(Math.random() * 100 - 50);
    const threshold = 40;
    // return (pos > -40 && pos < 40) ? (pos <= 0 ? pos -40 : pos + 40) : pos;
    if(!this.isValid(x, y, threshold)) {
      x = x >= 0 ? x + threshold : x - threshold;
      y = y >= 0 ? y + threshold : y - threshold;
    }
    return {x, y};
  }

  isValid(x, y, threshold) {
    return (x * x + y * y) > threshold * threshold;
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
      const pos = this.randomPosition();
      forest.push({
        // x: this.randomPosition(),
        // y: this.randomPosition(),
        ...pos,
        height: this.randomHeight(),
        scale: this.randomScale(),
      });
      
      console.log(forest[i]);
    }
    return forest;
  }

  render() {
    const { sky, size } = this.props;
    const forest = this.generateForest(size);
    return (
      <View>
        <WorldPano source={sky} />
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
        {/* { this.props.children } */}
        <WorldPlane position={[0, 0, 0]}/>
      </View>
    )
  }
}