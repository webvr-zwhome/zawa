import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Mark extends Module {
    constructor(scene){
        super('Mark');
        this._scene = scene;
        // this._fog = new THREE.FogExp2( 0xefd1b5, 0.04);
        // this._fog = new THREE.Fog( 0xefd1b5, 0.005, 10);
        
        this.init();
        this._direction = [0, 0, 0];
        // console.log(this._fog);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        // this._scen/e.fog = this._fog;
        
    }

    setup(pos) {
        this._direction = pos.slice();
        console.log('direction: ', this._direction)
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