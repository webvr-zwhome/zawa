import {Module} from "react-vr-web";
// import * as  THREE from 'three';

export default class Collision extends Module {
    constructor(){
        super('Collision');
        this.init();
        // console.log(this._fog);
    }

    init() {
        // this._scene.fog = this._fog;
        this.collisionList = [
            [0.3, 3, -1.6],
            [-0.5, 3, -2.4],
            [-1, 3, -3.2],
            [-1.5, 3, -4.0],
            [-2, 3, -5.0],
            [-2.5, 3, -6.2],
            [-3.0, 3, -7.4],
            [-3.5, 3, -8.6],
            [-4.5, 0, -9.8],
            [-5.0, 3, -11]
        ]
    }

    detect(position){
        let isCollision = false;
        this.collisionList.map((colPos)=>{
            if((Math.pow(colPos[0]-position[0], 2) + Math.pow(colPos[1]-position[1], 2) + Math.pow(colPos[2]-position[2], 4)) <= 2 ){
                isCollision = true;
            }
        })
        return isCollision
    }

    frame(time){
        // console.log(time)
    }
}