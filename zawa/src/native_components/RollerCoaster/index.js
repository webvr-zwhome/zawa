/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-05-12 21:23:20 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-13 22:29:55
 */
import { Module } from 'react-vr-web';
import * as THREE from 'three';

let i = 0;
export default class RollerCoaster extends Module{
    constructor(scene) {
        super('RollerCoaster');
        this._scene = scene;
        this._rollerCoaster = new THREE.Object3D();
        this._tube = new THREE.Mesh();
        this._params = {
            extrusionSegments: 100,
            radius: 0.2,
            radiusSegments: 12,
            closed: false,
        }
        this._start = false;
        this._path = new THREE.CatmullRomCurve3([]);
        this._points = [];
        this._position = new THREE.Vector3();
        this._time = 0;
        this.init();
    }

    init() {
        this.createTube();
        this._rollerCoaster.add(this._tube);
        this._scene.add(this._rollerCoaster);
    }

    _setPath() {
        const simplePath = new THREE.CatmullRomCurve3([
            new THREE.Vector3( 4, 14, 4 ),
			new THREE.Vector3( 14, 5, -4 ),
			new THREE.Vector3( 5, 14, -14 ),
			new THREE.Vector3( -10, 6, -14 ),
            new THREE.Vector3( -4, 14, 1 ),
            new THREE.Vector3( -14, 9, 14 ),
            new THREE.Vector3( 1, 4, 4 ),
        ]);
        const points = simplePath.getPoints(1000);
        points.map(point => new THREE.Vector3(point.x, point.y, point.z));
        this._path = new THREE.CatmullRomCurve3(points);
        // this._setPoints();
    }

    _setPoints() {
       this._points = this._path.getPoints(1000);
       console.log(this._points);
    }

    createTube() {
        this._setPath();
        const material = new THREE.MeshLambertMaterial({color: '#719c2f'});
        const geometry = new THREE.TubeBufferGeometry(
            this._path, 
            this._params.extrusionSegments, 
            this._params.radius,
            this._params.radiusSegments,
            this._params.closed,
        );
        const mesh = new THREE.Mesh(geometry, material);
        this._tube = mesh;
        console.log(this._tube);
    }

    frame(time) {
        if(!this._start) {
            return;
        }
        // if(Math.floor(time) - this._time > 30) {
            this._setPosition(this._path.points[i++]);
            this._time = Math.floor(time);
            if(i > 1001) { i = 0; }
        // }
    }

    _setPosition(position) {
        this._position = position;
    }

    getPosition() {
        return this._position;
    }

    start() {
        this._start = true;
    }

    getStatus() {
        return this._start;
    }
}