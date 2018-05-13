import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Fog extends Module {
    constructor(scene){
        super('Fog');
        this._scene = scene;
        this._fog = new THREE.FogExp2( 0x000088, 0.1 );
        this.init();
        console.log(this._fog);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        this._scene.fog = this._fog;
    }


    frame(time){
        // console.log(time)
    }
}