import {Module} from "react-vr-web";
import * as  THREE from 'three';

export default class Fog extends Module {
    constructor(scene){
        super('Fog');
        this._scene = scene;
        this._fog = new THREE.FogExp2( 0xC4E1FF, 0.015);
        this._geometry = new THREE.PlaneBufferGeometry(2500, 2500, 14, 14);
        this._geometry.rotateX( -Math.PI/2 );
        this._position = this._geometry.attributes.position;
        this._position.dynamic = true;
        // this._fog = new THREE.Fog( 0xefd1b5, 0.005, 10);
        this.changePosition();
        this._texture = new THREE.TextureLoader().load( '../../../static_assets/water.jpg' );
        this._texture.wrapS =  THREE.RepeatWrapping;
        this._texture.wrapT =  THREE.RepeatWrapping;
		this._texture.repeat.set( 10, 10 );
		this._material = new THREE.MeshBasicMaterial( { color: 0x0044ff, map: this._texture } );
		this._mesh = new THREE.Mesh( this._geometry, this._material );
        this.init();
        console.log(this._fog);
    }

    init() {
        // const parent = new THREE.Object3D();
        // parent.add(this._fog);
        this._scene.fog = this._fog;
        this._scene.add(this._mesh)
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

    changePosition(){
        for ( var i = 0; i < this._position.count; i ++ ) {
            var y = 35 * Math.sin( i / 2 );
            this._position.setY( i, y );
        }
    }
    frame(time){
        // console.log(time)
        for ( var i = 0; i < this._position.count; i ++ ) {
            var y = 1 * Math.sin( i / 10 + ( time + i ) / (10 * i))+ Math.cos( time / (i * 6) + 2) - 30 ;
            this._position.setY( i, y);
        }
        this._position.needsUpdate = true;
    }
}