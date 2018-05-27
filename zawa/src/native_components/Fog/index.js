import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Fog extends Module {
    constructor(scene){
        super('Fog');
        this._scene = scene;
        this._fog = new THREE.FogExp2(0xC4E1FF, 0.015);
        // console.log(this._fog);
        this.init();
    }

    init() {
        this._scene.fog = this._fog;
    }
      
    changeDensity(density) {
      this._fog.density = density;
    }
    changePosition(){
      
    }
    frame(time){
    }
}