import React from 'react';
import {
  AmbientLight,
  Animated,
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

export default class Mountain extends React.Component{
    constructor(props){
        super(props);
        // Animated.Model = Animated.createAnimatedComponent(Model)
        this.state={
          animaValue: new Animated.Value(0)
        }
        // const fog = NativeModules.Fog;
    }

    static defaultProps = {
      stonePosition: [
        [-0.6, 0, -0.1],
        [-0.5, 0, -1],
        [-1.4, 0, -1.5],
        [-2.0, 0, -2.3],
        [-2.5, 0, -3.8],
        [-3, 0, -5.4],
        [-3.5, 0, -7.2],
        [-4.0, 0, -7.9],
        [-5, 0, -9.0],
        [-6, 0, -10],
      ],
    } 
    componentWillReceiveProps(){
      if(this.props.moveIndex !== null){
        Animated.timing(                            // Animate value over time
          this.state.animaValue,                      // The value to drive
          {
            toValue: 3,                             // Animate to final value of 1
            // duration: 2000,
            // easing: Easing.ease
          }
        ).start(); 
      }
    }
   
    render() {
        const prefix = 'models/jumping/stones/';
        const stoneList = this.props.stonePosition.map((position, index) => {
          if(index===this.props.moveIndex){
            return (
              // <Animated.Model
              <Model
                key={index}
                source={{
                  obj: asset(`${prefix}stone00${index + 2}.obj`),
                  mtl: asset(`${prefix}stone00${index + 2}.mtl`)
                }}
                style={{
                  transform: [
                    // { translate: [position[0], position[1]+this.props.move, position[2]] }
                    // { translate: [position[0], position[1]+this.state.animaValue, position[2]] } 
                    {translate: position}
                  ],
                  color: 'red'
                }}
                lit={true}
              />
            )
          }else{
            return (
              <Model 
                key={index}
                source={{
                  obj: asset(`${prefix}stone00${index + 2}.obj`),
                  mtl: asset(`${prefix}stone00${index + 2}.mtl`)
                }}
                style={{
                  transform: [
                    { translate: position }
                  ]
                }}
                lit={true}
              />
            )
          }
        })
        
        return(
            <View>
              <Model
                source={{
                  obj: asset('models/jumping/land.obj'),
                  mtl: asset('models/jumping/land.mtl')
                }}
                style={{
                  transform:[
                    {translate: [29, -49, -35]},
                    {scale: 100}
                  ]
                }}
                lit={true}>
              </Model>
              {/* stones */}
              <View
                style={{
                  transform: [
                    {translate: [0.5, 3, -1]},
                    {scale: 3}
                  ]
                }}
              >
              {stoneList}
              {/* 
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
                lit={false}
              >
              </Model> */}
              {/* <Model 
                source={{
                  obj: asset('models/jumping/stones/stone002.obj'),
                  mtl: asset('models/jumping/stones/stone002.mtl')
                }}
                style={{
                  transform: [
                    {translate: [-0.2, 0, -0.6]}
                  ],
                  color: 'red'
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
                    {translate: [-1, 0, -1.4]}
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
                    {translate: [-1.5, 0, -2.2]}
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
                    {translate: [-2, 0, -3.0]}
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
                    {translate: [-2.5, 0, -4.0]}
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
                    {translate: [-3, 0, -5.2]}
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
                    {translate: [-3.5, 0, -6.4]}
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
                    {translate: [-4.0, 0, -7.6]}
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
                    {translate: [-5, 0, -8.8]}
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
                    {translate: [-5.5, 0, -10]}
                  ]
                }}
                lit={true}            
              >
              </Model> */}
              </View>
            </View>
        )
    }
}