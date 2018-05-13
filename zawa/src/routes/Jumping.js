/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-08 20:36:41 
 * @Last Modified by: penghuiwu
 * @Last Modified time: 2018-05-13 14:48:44
 */
import React from 'react';
import {
  AmbientLight,
  AppRegistry,
  DirectionalLight,
  NativeModules,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
  Sphere,
  SpotLight,
  VrHeadModel,
} from 'react-vr';

import Camera from '../components/Camera';

export default class Jumping extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {/* <Pano source={asset('chess-world.jpg')}/> */}
        {/* <Camera /> */}
        <AmbientLight 
          style={{
            transform: [
              {translate: [0, 1, 0]}  
            ],
            color: "#D3E7B9"            
          }}
          intensity={1}
        >
         </AmbientLight>
        <DirectionalLight
          style={{
            transform: [
              {translate: [1,8,1]}
            ],
            color: "#606060"
          }}
          intensity={1}
        >
        </DirectionalLight>
        <SpotLight
          style={{
            transform:[
              {translate: [-1,50,0]}
            ]
          }}
          intensity={0.5}
        >
        </SpotLight>
        {/* <World /> */}
        <Pano 
          source={asset('heaven.png')}
        >
        </Pano>
        <Camera />
        <Text
            style={{
                backgroundColor: '#777879',
                fontSize: 0.8,
                fontWeight: '400',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
        }}>
          hello
        </Text>
        <Model
          source={{
            obj: asset('models/jumping/land.obj'),
            mtl: asset('models/jumping/land.mtl')
          }}
          style={{
            transform:[
              {translate: [30, -53, -35]},
              {scale: 100}
            ]
          }}
          lit={true}
          // wireframe={true}
        >
        </Model>
        {/* stones */}
        <View
          style={{
            transform: [
              {translate: [5, -2, -6]},
              {scale: 10}
            ]
          }}

        >
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone001.obj'),
              mtl: asset('models/jumping/stones/stone001.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone002.obj'),
              mtl: asset('models/jumping/stones/stone002.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone003.obj'),
              mtl: asset('models/jumping/stones/stone003.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone004.obj'),
              mtl: asset('models/jumping/stones/stone004.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone005.obj'),
              mtl: asset('models/jumping/stones/stone005.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone006.obj'),
              mtl: asset('models/jumping/stones/stone006.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone007.obj'),
              mtl: asset('models/jumping/stones/stone007.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone007.obj'),
              mtl: asset('models/jumping/stones/stone007.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone008.obj'),
              mtl: asset('models/jumping/stones/stone008.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
            
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone009.obj'),
              mtl: asset('models/jumping/stones/stone009.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}
          
          >
          </Model>
          <Model 
            source={{
              obj: asset('models/jumping/stones/stone010.obj'),
              mtl: asset('models/jumping/stones/stone010.mtl')
            }}
            style={{
              transform: [
                {translate: [0, 0, 0]}
              ]
            }}
            lit={true}            
          >
          </Model>
        </View>
      </View> 
    )
  }
}