// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {MouseRayCaster} from 'ovrui';
import * as THREE from 'three';
import ThreeDOFRayCaster from '../src/native_components/inputs/3dof/ThreeDOFRayCaster';
import Fog from '../src/native_components/Fog';
import Mark from '../src/native_components/Mark';
import Collision from '../src/native_components/Collision';
// import GamePad from '../src/native_components/GamePad'

function init(bundle, parent, options) {
  const scene = new THREE.Scene();
  const threeDOFRayCaster =  new ThreeDOFRayCaster(scene);
  let cameraPosition = threeDOFRayCaster._getCameraNewPosition();
  const fog = new Fog(scene);
  const mark = new Mark(scene);
  const collision = new Collision();
  let jumpPower = 0;
  let jumpTime = 0;
  const g = 98;
  // const gamePad = new GamePad()
  const vr = new VRInstance(bundle, 'zawa', parent, {
    // Add custom options here
    raycasters: [
      threeDOFRayCaster,
      new MouseRayCaster(),
    ],
    nativeModules:[
      fog,
      mark,
      collision
    ],
    cursorVisibility: 'auto',
    scene: scene,
    ...options,
  });
  vr.render = function(time) {
    // Any custom behavior you want to perform on each frame goes here
    fog.frame(time);
    mark.frame();
    // gamePad.frame();
    const cameraNewPosition = threeDOFRayCaster._getCameraNewPosition();
    const defaultPower = 10;

    if(cameraNewPosition != cameraPosition) {
      // console.log(cameraNewPosition);
     
      vr.rootView.context.bridge._worker.postMessage({
        type: "newPosition", 
        position: cameraNewPosition,
      });
      cameraPosition = cameraNewPosition;
    }

    //判定是否需要计算跳跃路线
    if(jumpPower !== 0){
      jumpTime += 0.01;
      let jumpDis = jumpPower/10 * defaultPower * jumpTime;
      let upDis = jumpPower * defaultPower * jumpTime - g * Math.pow(jumpTime, 2)/2;
      vr.rootView.context.bridge._worker.postMessage({
        type: 'jumpPosition',
        jumpDis: jumpDis,
        upDis: upDis 
      })
    }else{
      jumpTime = 0;
    }
  };
  // vr.rootView.context.bridge._worker.addEventListener({'message', onVRMessage });
  vr.rootView.context.bridge._worker.addEventListener('message', (e)=>{
    switch (e.data.type) {
      // case 'teleport':
      //   effectController.teleport = e.data.data;
      //   break;
      case 'direction':
        mark.setup(e.data.data.move);
        break;
      case 'postPower':
        jumpPower = e.data.data.power;
        break;
      case 'postVrHeadModel':
        vr.rootView.context.bridge._worker.postMessage({
          type: 'isCollision',
          isCollision: collision.detect(e.data.data.HmPosition)
        });
        break;
      case 'endPower':
        jumpPower = 0;
        break;
      default:
      return;
    }
  });
  
  // Begin the animation loop  
  vr.start();
  return vr;
}

// function onVRMessage(e) {
//   switch (e.data.type) {
//     // case 'teleport':
//     //   effectController.teleport = e.data.data;
//     //   break;
//     case 'direction':
//       mark.setup(e.data.data.move);
//       break
//     default:
//     return;
//   }
// }

window.ReactVR = {init};
