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
            [-3, 3, -4],
            [-5.7, 3, -5.5],
            [-7.5, 3, -10],
            [-8.9, 3, -12.2],
            [-10.5, 3, -17],
            [-12, 3, -22.5],
            [-13.3, 3, -24.5],
            [-16.3, 3, -27.9],
            [-19.3, 3, -30.8]
        ]
    }

    detect(position){
        let isCollision = false;
        let indexCol = null;
        this.collisionList.map((colPos, index)=>{
            // if((colPos[1]+1 > position[1]) && (Math.pow(colPos[0]-position[0], 2) + Math.pow(colPos[1]-position[1], 2) + Math.pow(colPos[2]-position[2], 4)) <= 2 ){
            //     isCollision = true;
            // }
            if(( position[1] > colPos[1] )&&( position[1] < colPos[1]+2 ) && (colPos[0]-1 < position[0]) && (position[0] < colPos[0] + 1) && (colPos[2] - 1 < position[2]) && (position[2] < colPos[2] + 1)){
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