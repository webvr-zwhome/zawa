/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-05-12 21:23:20 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-27 23:34:55
 */
import { Module } from 'react-vr-web';
import * as THREE from 'three';

import { path } from './path';
import { RollerCoasterGeometry } from './rollerGeometry';

function box(position, color) {
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var material = new THREE.MeshBasicMaterial( {color: color} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(position.x, position.y, position.z);
    // console.log(position);
    cube.name = 'box';
    return cube;
}

function cylinder(height, position, quaternion) {
    var geometry = new THREE.CylinderBufferGeometry( 0.05, 0.05, height, 12 );
    var material = new THREE.MeshLambertMaterial( {color: '#fff'} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.set(position.x, position.y, position.z);
    // cylinder.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    cylinder.name = 'cylinder';
    return cylinder;
}

// let i = 0;
export default class RollerCoaster extends Module{
    constructor(scene) {
        super('RollerCoaster');
        this._scene = scene;
        this._rollerCoaster = new THREE.Object3D();

        this._path = new THREE.CatmullRomCurve3([]);
        this._pathLeft = new THREE.CatmullRomCurve3([]);
        this._pathRight = new THREE.CatmullRomCurve3([]);

        this._tube = new THREE.Mesh();
        this._tubeLeft = new THREE.Mesh();
        this._tubeRight = new THREE.Mesh();
        
        this._params = {
            extrusionSegments: 1500,
            radius: 0.05,
            radiusSegments: 3,
            closed: true,
        }

        this._start = false;
        this._startTime = Date.now();
        // console.log(this._startTime);
        this._loopTime = 100 * 1000;
        this._preT = 0;   // used by getting point at path
        this._position = new THREE.Vector3();
        this._rotation = new THREE.Vector3();
        this._normal = new THREE.Vector3(); 
        this._binormal = new THREE.Vector3();
        this.init();
    }

    init() {
        this.createTube();
       
        this._rollerCoaster.add(this._tube);
        this._rollerCoaster.add(this._tubeLeft);
        this._rollerCoaster.add(this._tubeRight);
        
        this._scene.add(this._rollerCoaster);
    }

    _setPath() {
        const offsetSide = 0.3;
        const offsetUp = 0.1;
        let points = [];
        let tangents = [];
        let binormals = [];
        let leftPath = [];
        let rightPath = [];

        const simplePath = new THREE.CatmullRomCurve3(path);
        // simplePath.curveType = 'catmullrom';
        this._path = simplePath;

        for (let i = 0; i < path.length; i++) {
            this._rollerCoaster.add(box(path[i], 0x00ff00));              // for debug
            // points[i] = this._path.getPointAt(i / (path.length - 1));
            points[i] = path[i];
            // tangents[i] = this._path.getTangentAt(i / (path.length - 1));
            var nextPoint = path[(i + 1) % path.length];
            var tangent = nextPoint.clone().sub(points[i]);
            const Up = new THREE.Vector3(0, 1, 0);
            const Forward = new THREE.Vector3(0, 0, -1);
            const Right = new THREE.Vector3(1, 0, 0);
            const binormal = tangent.clone().cross(Up).normalize();
            // console.log('nextPoint: ', nextPoint);
            // console.log('point: ', points[i]);
            // console.log('tar: ', tangent);
            // console.log('bin: ', binormal);
         
            binormal.multiplyScalar(offsetSide / Math.abs(binormal.x || 1));
            // binormal.applyQuaternion(quaternion);
            let angle = tangent.angleTo(Forward);
            if(tangent.angleTo(Right) > 90) {
                angle = 360 - angle;
            }
            // var quaternion = new THREE.Quaternion();
            // quaternion.setFromAxisAngle( Up, angle );
            // binormal.applyQuaternion(quaternion);

            // if (angle >= 0 && angle <= 270) {
            //     binormal.setX(offsetSide * Math.cos(angle));
            //     binormal.setZ(offsetSide * Math.sin(angle) * (-1));
            // } else {
            //     binormal.setX(offsetSide * Math.sin(angle) * (-1));
            //     binormal.setZ(offsetSide * Math.cos(angle));
            // }

            // console.log('bin2: ', binormal);

            leftPath[i] = path[i].clone().add(new THREE.Vector3(-binormal.x, offsetUp, -binormal.z));
            rightPath[i] = path[i].clone().add(new THREE.Vector3(binormal.x, offsetUp, binormal.z));
            this._rollerCoaster.add(box(leftPath[i], 0xff0000));              // for debug
            this._rollerCoaster.add(box(rightPath[i], 0x0000ff));              // for debug

            // console.log('left: ', box(leftPath[i], 0xff0000));
            // console.log('right: ', rightPath[i]);
            // console.log(i, '---------------');
        }
        
       

        // for (let i = 0, segments = this._params.extrusionSegments; i < segments - 1; i += 5) {

        //     const offsetSide = 0.2;
        //     var pos = this._path.getPointAt(i / (segments - 1));
        //     var nextPos = this._path.getPointAt((i + 1) / (segments - 1));
        //     var distance = nextPos.distanceTo(nextPos);
        //     var dir = nextPos.clone().sub(pos);
        //     var Up = new THREE.Vector3(0, 1, 0);
        //     var left = Up.clone().cross(dir.clone());
        //     // var right = dir.clone().cross(Up.clone());
        //     // console.log(left, right);
        //     // var position = prePos.clone().add(pos.clone()).multiplyScalar(0.5); 
        //     var position = pos.clone();
        //     position.add(new THREE.Vector3(0, offsetUp, 0));

        //     left.multiplyScalar(offsetSide / left.x);
        //     if(left.x < 0) {
        //         left = new THREE.Vector3(-left.x, -left.y, -left.z);
        //     }

        //     var right = new THREE.Vector3(-left.x, -left.y, -left.z);

        //     // right.multiplyScalar(offsetSide / right.x);
        //     var positionLeft = position.clone().add(left);
        //     var positionRight = position.clone().add(right);

        //     this._scene.add(cylinder(distance, positionLeft));
        //     this._scene.add(cylinder(distance, positionRight));
        //     // if(right.x > 0)console.log('left: ', left);
        //     // if ( position.x <0)console.log('pos: ', position);
        //     // console.log('right: ', right);
        //     leftPath.push(positionLeft);
        //     rightPath.push(positionRight);
        //     // console.log(dir);

        // } 
        this._pathLeft = new THREE.CatmullRomCurve3(leftPath);
        this._pathRight = new THREE.CatmullRomCurve3(rightPath);

        for(let i = 0, segments = this._params.extrusionSegments; i < segments; i += 50) {
            var point = this._path.getPointAt(i / (segments - 1));
            var pointLeft = this._pathLeft.getPointAt(i / (segments - 1));
            var pointRight = this._pathRight.getPointAt(i / (segments - 1));
            const height = point.y + 40;
            
            this._rollerCoaster.add(cylinder(height, new THREE.Vector3(point.x, point.y - height / 2 , point.z), new THREE.Quaternion(0, 0, 0, 0)));  
            this._rollerCoaster.add(cylinder(height, new THREE.Vector3(pointLeft.x, pointLeft.y - height / 2 , pointLeft.z), new THREE.Quaternion(0, 0, 0, 0)));              // for debug
            this._rollerCoaster.add(cylinder(height, new THREE.Vector3(pointRight.x, pointRight.y - height / 2 , pointRight.z), new THREE.Quaternion(0, 0, 0, 0)));              // for debug
            // for debug

            // console.log(point);
        }
    }

    createTube() {
        this._setPath();

        const geometry = new THREE.TubeBufferGeometry(
            this._path, 
            this._params.extrusionSegments, 
            this._params.radius,
            this._params.radiusSegments,
            this._params.closed,
        );

        const geometryLeft = new THREE.TubeBufferGeometry(
            this._pathLeft, 
            this._params.extrusionSegments, 
            this._params.radius,
            this._params.radiusSegments,
            this._params.closed,
        );

        const geometryRight = new THREE.TubeBufferGeometry(
            this._pathRight, 
            this._params.extrusionSegments, 
            this._params.radius,
            this._params.radiusSegments,
            this._params.closed,
        );
        
        const material = new THREE.MeshLambertMaterial({color: '#9c712f'});
        const materialLeft = new THREE.MeshLambertMaterial({color: '#fff'});
        const materialRight = new THREE.MeshLambertMaterial({color: '#ff0'});

        const mesh = new THREE.Mesh(geometry, material);

        const meshLeft = new THREE.Mesh(geometryLeft, materialLeft);
        const meshRight = new THREE.Mesh(geometryRight, materialRight);

        this._tube = mesh;
        this._tubeLeft = meshLeft;
        this._tubeRight = meshRight;
        // this._tubeLeft.position.set(-0.2, 0.1, 0);
        // this._tubeRight.position.set(0.2, 0.1, 0);
        console.log(this._tube);
    }

    frame(time) {
        if(!this._start) {
            return;
        }
        const timeNow = Date.now();
        const g = 10;
        
        const t = ( (timeNow - this._startTime) % this._loopTime ) / this._loopTime;
        var prePos = this._path.getPointAt(this._preT);
        var pos = this._path.getPointAt(t);
        // var segments = this._tube.geometry.tangents.length;
        // var pickt = t * segments;
        // var pick = Math.floor(pickt);
        // var pickNext = (pick + 1) % segments;
        // this._binormal.subVectors(this._tube.geometry.binormals[pickNext], this._tube.geometry.binormals[pick]);
        // this._binormal.multiplyScalar(pickt - pick).add(this._tube.geometry.binormals[pick]);

        // var dir = this._path.getTangentAt(t);
        var dir = pos.clone().sub(prePos);
        var offset = 1.2;
        // const Up = new THREE.Vector3(0, 1, 0);
        // this._normal.copy(this._binormal).cross(dir);

        // we move on a offset on its binormal
        // pos.add(this._normal.clone().multiplyScalar(offset));
        pos.add(new THREE.Vector3(0, offset, 0));
        this._setPosition(pos);

        // caculate camera direction
        var dirOnPlane = new THREE.Vector3(dir.x, 0, dir.z);
        var condition = dirOnPlane.angleTo(new THREE.Vector3(1, 0, 0)) * 360 / (2 * Math.PI);
        var angle = dirOnPlane.angleTo(new THREE.Vector3(0, 0, -1)) * 360 / (2 * Math.PI);
        
        if(condition <= 90) {
            angle = 360 - angle;
        }
        var rotation = new THREE.Vector3(0, angle, 0);
        this._setRotation(rotation);  
        
        this._preT = t;
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
        this._startTime = Date.now();
    }

    hide(visible) {
        console.log(this._rollerCoaster);
        this._rollerCoaster.visible = visible;
    }

    getStatus() {
        return this._start;
    }
}