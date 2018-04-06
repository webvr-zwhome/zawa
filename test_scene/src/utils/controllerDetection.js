import { NativeModules } from 'react-vr';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
const RCTHeadModel = require('RCTHeadmodel');

/**
 * 
 * @param {callback} cb
 *  
 */
export default function controllerDetection(cb) {

    NativeModules.ControllerInfo.getControllers().then(controllers => {
        cb(controllers);
    });
    // 对重新进入的controller进行检测
    RCTDeviceEventEmitter.addListener('controllerConnected', e => {
        // console.log('controllers', e);
        let added = false;
        const nextControllers = this.state.controllers.map(c => {
            if(c.index === e.index) {
                added = true;
                return e;
            } else {
                return c;
            }
        });
        if(!added) {
            nextControllers.push(e);
        }
        cb(nextControllers);
    }) 
}