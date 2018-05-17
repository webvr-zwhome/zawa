import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Mark extends Module {
    constructor(scene){
        super('Mark');
        this._scene = scene;
        // this._fog = new THREE.FogExp2( 0xefd1b5, 0.04);
        // this._fog = new THREE.Fog( 0xefd1b5, 0.005, 10);
        
        this.init();

        // this.length = 1;
        // this.hex = 0xffff00;
        // this.dir = new THREE.Vector3(1, 0, 0);
        // this.dir.normalize();
        // this.origin = new THREE.Vector3(0, 0, 0);
        // this.arrowHelper = new THREE.ArrowHelper(this.dir, this.origin, this.length, this.hex);
        // this._scene.add(this.arrowHelper);

        this.dir = new THREE.Vector3( 1, 2, 0 );

        //normalize the direction vector (convert to vector of length 1)
        this.dir.normalize();

        this.origin = new THREE.Vector3( 0, 0, 0 );
        var length = 1;
        var hex = 0xffff00;

        var arrowHelper = new THREE.ArrowHelper( this.dir, this.origin, length, hex );
        arrowHelper.name = 'arrow';
        this._scene.add( arrowHelper );

        // this._move = [0, 0, 0];
        // console.log('scene: ', this._scene);
        // console.log(this._fog);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        // this._scen/e.fog = this._fog;
        
    }

    setup(pos) {
        var length = 1;
        var hex = 0xffff00;
        this._move = pos.slice();
        this.dir = new THREE.Vector3( this._move[0][0]-this._move[1][0], this._move[0][1]-this._move[1][1], this._move[0][2]-this._move[1][2] );
        this.dir = this.dir.normalize();
        this.origin = this._move[1].slice();
        arrowHelper = new THREE.ArrowHelper( this.dir, this.origin, length, hex );
        arrowHelper.name = "arr"
        this._scene.add( arrowHelper );
        // arrowHelper.parent = this._scene;
        // console.log('direction: ', this._direction)
        // this.arrowHelper = new THREE.arrowHelper(this.dir, this.origin, this.length, this.hex)
        console.log('scene: ', this._scene);
        
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