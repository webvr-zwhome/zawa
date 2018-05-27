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
            [0.5, 3, -1.1],
            [0, 3, -2],
            [-0.9, 3, -2.5],
            [-1.5, 3, -4.0],
            [-2, 3, -4.8],
            [-2.5, 3, -6.4],
            [-3.0, 3, -8.2],
            [-3.5, 3, -8.9],
            [-4.5, 3, -10.0],
            [-5.5, 3, -11]
        ]
    }

    detect(position){
        let isCollision = false;
        let indexCol = null;
        this.collisionList.map((colPos, index)=>{
            // if((colPos[1]+1 > position[1]) && (Math.pow(colPos[0]-position[0], 2) + Math.pow(colPos[1]-position[1], 2) + Math.pow(colPos[2]-position[2], 4)) <= 2 ){
            //     isCollision = true;
            // }
            // if((colPos[1] + 1  < position[1]) && (colPos[0]-0.5 < position[0]) && (position[0] < colPos[0]+0.5) && (colPos[2] - 0.5 < position[2]) && (position[2] < colPos[2] + 0.5)){
            if(colPos[1] + 1  < position[1]){
                isCollision = true;
                indexCol = index;
                console.log('collistion sucess')
            }
        })
        return {
            isCollision: isCollision, 
            indexCol: indexCol,
        }
    }
    frame(time){
        // console.log(time)
    }
}