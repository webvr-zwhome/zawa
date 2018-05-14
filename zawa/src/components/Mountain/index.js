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



export default class Mountain extends React.Component{
    constructor(props){
        super(props);
        const fog = NativeModules.Fog;
    }

    render(){
        return(
            <View>
                <Model
          source={{
            obj: asset('models/jumping/land.obj'),
            mtl: asset('models/jumping/land.mtl')
          }}
          style={{
            transform:[
              {translate: [30, -49, -35]},
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
              {translate: [0.5, 3, -1]},
              {scale: 3}
            ]
          }}

        >
          {/* <Model 
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
          <Model 
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
          </Model>
        </View>
            </View>
        )
    }
}