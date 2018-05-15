/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-05-12 21:23:20 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-15 17:20:08
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
            extrusionSegments: 1000,
            radius: 0.2,
            radiusSegments: 12,
            closed: true,
        }
        this._start = false;
        this._path = new THREE.CatmullRomCurve3([]);
        this._points = [];
        this._position = new THREE.Vector3();
        this._rotation = new THREE.Vector3();
        this._time = 0;
        this._normal = new THREE.Vector3(); 
        this._binormal = new THREE.Vector3();
        this.init();
    }

    init() {
        this.createTube();
        this._rollerCoaster.add(this._tube);
        this._scene.add(this._rollerCoaster);
    }

    _setPath() {
        const simplePath = new THREE.CatmullRomCurve3([
            new THREE.Vector3( 20, 10, 0 ),
			new THREE.Vector3( 20, 15, -20 ),
			new THREE.Vector3( 0, 14, -20 ),
			new THREE.Vector3( -20, 6, -20 ),
            new THREE.Vector3( -20, 14, 0 ),
            new THREE.Vector3( -20, 9, 20 ),
            new THREE.Vector3( 0, 10, 20 ),
            new THREE.Vector3( 20, 10,20 ),
            new THREE.Vector3( 20, 10, 0 ),

        ]);
        this._path = simplePath;
        // const points = simplePath.getPoints(1000);
        // points.map(point => new THREE.Vector3(point.x, point.y, point.z));
        // this._path = new THREE.CatmullRomCurve3(points);
        // this._setPoints();
        // console.log('path', this._path.getPointAt(0));
    }

    _setPoints() {
    //    this._points = this._path.getPoints(1000);
    //    console.log(this._points);
        
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
        
        const timeNow = Math.floor(time);
        const loopTime = 10 * 1000;
        const t = ( timeNow % loopTime ) / loopTime;

        var pos = this._path.getPointAt(t);
        var segments = this._tube.geometry.tangents.length;
        var pickt = t * segments;
        var pick = Math.floor(pickt);
        var pickNext = (pick + 1) % segments;
        
        this._binormal.subVectors(this._tube.geometry.binormals[pickNext], this._tube.geometry.binormals[pick]);
        this._binormal.multiplyScalar(pickt - pick).add(this._tube.geometry.binormals[pick]);

        var dir = this._path.getTangentAt(t);
        var offset = 1.5;
        this._normal.copy(this._binormal).cross(dir);

        // we move on a offset on its binormal
        pos.add(this._binormal.clone().multiplyScalar(offset));
        this._setPosition(pos);

        var dirOnPlane = new THREE.Vector3(dir.x, 0, dir.z);
        var condition = dirOnPlane.angleTo(new THREE.Vector3(1, 0, 0)) *360 / (2 * Math.PI);
        var angle = dirOnPlane.angleTo(new THREE.Vector3(0, 0, -1)) * 360 / (2 * Math.PI);
        if(condition <= 90) {
            angle = 360 - angle;
        }
        var rotation = new THREE.Vector3(0, angle, 0);
        this._setRotation(rotation);        
        // console.log(rotation);        
    }

    _setPosition(position) {
        this._position = position;
    }

    _setRotation(rotation) {
        this._rotation = rotation;
    }

    getPosition() {
        return this._position;
    }

    getRotation() {
        return this._rotation;
    }

    start() {
        this._start = true;
    }

    getStatus() {
        return this._start;
    }
}