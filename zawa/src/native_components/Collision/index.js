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
            [-1.5, 3, -1.3],
            [-1.1, 3, -4],
            [-3.8, 3, -5.5],
            [-5.6, 3, -10],
            [-7.0, 3, -12.2],
            [-8.6, 3, -17],
            [-10.1, 3, -22.5],
            [-11.4, 3, -24.5],
            [-14.4, 3, -27.9],
            [-17.4, 3, -30.8]
        ]
    }

    detect(position){
        let isCollision = false;
        let indexCol = null;
        this.collisionList.map((colPos, index)=>{
            // if((colPos[1]+1 > position[1]) && (Math.pow(colPos[0]-position[0], 2) + Math.pow(colPos[1]-position[1], 2) + Math.pow(colPos[2]-position[2], 4)) <= 2 ){
            //     isCollision = true;
            // }
            if(( position[1] > colPos[1] )&&( position[1] < colPos[1]+1 ) && (colPos[0]-0.5 < position[0]) && (position[0] < colPos[0] + 0.5) && (colPos[2] - 0.5 < position[2]) && (position[2] < colPos[2] + 0.5)){
            // if(colPos[1] + 1  < position[1]){
                isCollision = true;
                indexCol = index;
                console.log('collistion sucess')
                console.log('collision Index: ',indexCol);
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