// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {MouseRayCaster} from 'ovrui';
import * as THREE from 'three';
import ThreeDOFRayCaster from '../src/native_components/inputs/3dof/ThreeDOFRayCaster';
import Fog from '../src/native_components/Fog';
import Water from '../src/native_components/Water';
import Mark from '../src/native_components/Mark';
import Collision from '../src/native_components/Collision';
// import GamePad from '../src/native_components/GamePad'
import RollerCoaster from '../src/native_components/RollerCoaster';
// import Fog from '../src/native_components/Fog';

function init(bundle, parent, options) {
  const scene = new THREE.Scene();
  const threeDOFRayCaster =  new ThreeDOFRayCaster(scene);
  const rollerCoaster = new RollerCoaster(scene);
  // const fog = new Fog(scene);

  let cameraPosition = threeDOFRayCaster._getCameraNewPosition();
  const fog = new Fog(scene);
  const water = new Water(scene);
  const mark = new Mark(scene);
  const collision = new Collision();
  let jumpPower = 0;
  let jumpTime = 0;
  const g = 9.8;
  // const gamePad = new GamePad();
  // let moveText = new THREE.Vector3(-0.2, 0.5, -0.4);
  const vr = new VRInstance(bundle, 'zawa', parent, {
    // Add custom options here
    raycasters: [
      threeDOFRayCaster,
      new MouseRayCaster(),
    ],
    nativeModules:[
      fog,
      water,
      mark,
      collision,
      rollerCoaster,
    ],
    cursorVisibility: 'auto',
    scene: scene,
    ...options,
  });

  vr.render = function(time) { 
    // Any custom behavior you want to perform on each frame goes here
    fog.frame(time);
    water.frame(time);
    mark.frame();
    rollerCoaster.frame(time);    // start play roller coaster
    const cameraNewPosition = threeDOFRayCaster._getCameraNewPosition();
    const cameraNewPositionInRoller = rollerCoaster.getPosition();
    const cameraNewRotationInRoller = rollerCoaster.getRotation();
    const defaultPower = 10;
    // console.log(cameraNewRotationInRoller);

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
      console.log('jumpPower: ',jumpPower)
      jumpTime += 0.005;
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

    if(rollerCoaster.getStatus() && cameraNewPositionInRoller != cameraPosition) {
      // console.log(cameraNewPosition);
      vr.rootView.context.bridge._worker.postMessage({
        type: "rollerPosition", 
        position: cameraNewPositionInRoller,
      });
  
      vr.rootView.context.bridge._worker.postMessage({
        type: "rollerRotation", 
        rotation: cameraNewRotationInRoller,
      });
      cameraPosition = cameraNewPositionInRoller;
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
          Collision: collision.detect(e.data.data.HmPosition)
        });
        break;
      case 'endPower':
        jumpPower = 0;
        break;
      case 'rotateText':
        console.log('postVrheadpos: ',e.data.data.HmPos)
        const moveText = new THREE.Vector3(-0.2, 0.5, -0.4);
        const moveHY = new THREE.Vector3(0,1,0);
        const moveAngle = e.data.data.HmPos * Math.PI / 180;
        moveText.applyAxisAngle(moveHY, moveAngle)
        vr.rootView.context.bridge._worker.postMessage({
          type: 'moveText',
          moveText: [moveText.x, moveText.y, moveText.z]
        });
        break;
      // case 'getGamePad':
      //   // vr.rootView.context.bridge._worker.postMessage({
      //   //   type: 'gamePad',
      //   //   Touch: gamePad.setAct()
      //   // });
      //   gamePad.setAct(e.data.data.pre);
      //   console.log('pre: ',e.data.data.pre);
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
