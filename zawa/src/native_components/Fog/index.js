import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Fog extends Module {
    constructor(scene){
        super('Fog');
        this._scene = scene;
        this._fog = new THREE.FogExp2( 0xefd1b5, 0.04);
        // this._fog = new THREE.Fog( 0xefd1b5, 0.005, 10);
        
        this.init();
        console.log(this._fog);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        this._scene.fog = this._fog;
    }

    // generateHeight( width, height ) {
    //     var size = width * height, data = new Uint8Array( size ),
    //     perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
    //     for ( var j = 0; j < 4; j ++ ) {
    //         for ( var i = 0; i < size; i ++ ) {
    //             var x = i % width, y = ~~ ( i / width );
    //             data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
    //         }
    //         quality *= 5;
    //     }
    //     return data;
    // }
    // generateHeight( width, height ) {
    //     var size = width * height, data = new Uint8Array( size ),
    //     perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
    //     for ( var j = 0; j < 4; j ++ ) {
    //         for ( var i = 0; i < size; i ++ ) {
    //             var x = i % width, y = ~~ ( i / width );
    //             data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
    //         }
    //         quality *= 5;
    //     }
    //     return data;
    // }

    frame(time){
        // console.log(time)
    }
}