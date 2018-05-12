/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-05-12 21:23:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-13 00:08:16
 */
import { Module } from 'react-vr-web';
import * as THREE from 'three';

export default class RollerCoaster extends Module{
    constructor(scene) {
        super('RollerCaster');
        this._scene = scene;
        this._rollerCoaster = new THREE.Object3D();
    }

    init() {
        console.log('2');
    }

    
}