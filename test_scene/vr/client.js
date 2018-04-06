// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import { Module, VRInstance } from 'react-vr-web';
import {MouseRayCaster} from 'ovrui';
import * as THREE from 'three';
import ControllerRayCaster from 'react-vr-controller-raycaster';

import ThreeDOFRayCaster from '../inputs/3dof/ThreeDOFRayCaster';
// import { VrHeadModel } from 'react-vr';
class TeleportModule extends Module {
  constructor() {
      super('TeleportModule');
      this._camera = null;
  }

  setCamera(camera) {
      this._camera = camera;
  }

  teleportCamera(x, y, z) {
      if(this._camera) {
        this._camera.position.set(x, y, z);
        this._camera.updateMatrixWorld(true);
        // console.log(this._camera);
        // debugger;
        // console.log('12');
      }
  }
}

class GetHeadModelModule extends Module {
  constructor() {
    super('GetHeadModelModule');
    this._headModelPosition = {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  setHeadModelPosition(headModelPosition) {
    // console.log('headModel: ', headModel);
    this._headModelPosition = headModelPosition;
    // console.log('_headModel: ', this._headModelPosition);
    // debugger;

  }

  getHeadModelPosition() {
    return this._headModelPosition;
  }
}
function init(bundle, parent, options) {

  const scene = new THREE.Scene();
  const teleportModule = new TeleportModule();
  const getHeadModelModule = new GetHeadModelModule();
  window.headModelPosition = getHeadModelModule.getHeadModelPosition();
  // console.log('headModelPositionInit', headModelPosition);

  const vr = new VRInstance(bundle, 'test_scene', parent, {
    // Add custom options here
    nativeModules: [teleportModule, getHeadModelModule],
    raycasters: [
      new ThreeDOFRayCaster(scene, headModelPosition), 
      // new ControllerRayCaster({
      //   hand: 'left',
      //   scene,
      //   color: '#ffff00'
      // }),
      new MouseRayCaster()
    ],
    cursorVisibility: 'auto',
    scene: scene,
    ...options,
  });
  // debugger;
  teleportModule.setCamera(vr.player.camera);
  console.log('provr:',vr);
  // console.log('pro:',vr.guiSys);
 

  vr.render = function() {
    // console.log('vr.camera:',vr.camera().position);
    // console.log('vr camera rotation:',vr.camera().rotation);
    // debugger;
    // Any custom behavior you want to perform on each frame goes here
    window.headModelPosition = getHeadModelModule.getHeadModelPosition();
    // vr.guiSys.raycasters[0] = new ThreeDOFRayCaster(scene, headModelPosition);
    // console.log('headModelPosition-render', headModelPosition);

  };

  
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};


