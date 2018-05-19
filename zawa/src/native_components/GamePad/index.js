import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class GamePad extends Module {
    constructor(){
        super('GamePad');
        // super('Fog');
        // this._scene = scene;
        // this._fog = new THREE.FogExp2( 0xefd1b5, 0.04);
        // this._fog = new THREE.Fog( 0xefd1b5, 0.005, 10);
        const gamePad = navigator.getGamepads();
        // this.HapticActuators  = gamePad[1].hapticActuators;
        this.init();
        console.log(gamePad);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        // this._scene.fog = this._fog;
    }
    setAct(per){
        this.hapticActuators.pulse(per);
    }
    frame(time){
        // console.log(time)
    }
}