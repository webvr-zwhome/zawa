/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 22:54:45 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-04-29 22:38:38
 */
import React from 'react';
import {
  View,
  Pano,
  asset,
  Model,
} from 'react-vr';
import WorldPano from './WorldPano';
import WorldPlane from './WorldPlane';
import Tree from './Tree';
import AmbientLightAll from '../components/Light/ambientLightAll'; 

// 世界由天空、森林、地面组成, 作为Home的外层包裹
export default class World extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    sky: asset('heaven.png'),
    size: 100,  // 树的数量
    hasTree: true,
  }

  state = {
    forest: [],
  }

  componentWillMount() {
    this.setState({
      forest: this.generateForest(this.props.size),
    })
  }


  randomPosition() {
    const THRESHOLD_CIRCLE = 50;    // 建筑区域阈值
    const THRESHOLD_RECT = 150;     // 地面长宽阈值

    let x = Math.floor(Math.random() * THRESHOLD_RECT - THRESHOLD_RECT / 2);
    let y = Math.floor(Math.random() * THRESHOLD_RECT - THRESHOLD_RECT / 2);

    while (!this.isValid(x, y, THRESHOLD_CIRCLE)) {
      x = Math.floor(Math.random() * THRESHOLD_RECT - THRESHOLD_RECT / 2);
      y = Math.floor(Math.random() * THRESHOLD_RECT - THRESHOLD_RECT / 2);
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
      // console.log(forest[i]);
    }
    return forest;
  }
  
  render() {
    const { sky, size, hasTree } = this.props;
    // const forest = this.generateForest(size);
    const forest = this.state.forest;
    return (
      <View>
        <AmbientLightAll />
        <WorldPano source={sky} />
        {
          !hasTree ? null : forest.map((tree, index) => (
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