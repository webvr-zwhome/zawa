const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default function getControllerState() {
    const buttons = [];
    const axes = [];
    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
        if (e.type !== 'GamepadInputEvent') {
          return;
        }
        if (e.eventType === 'keydown') {
          buttons[e.button] = true;
        } else if (e.eventType === 'keyup') {
          buttons[e.button] = false;
        } else if (e.eventType === 'axismove') {
          axes[e.axis] = e.value;
        }
    });
    // console.log('b: ', buttons);
    // console.log('ax: ', axes);
    return {
        buttons,
        axes,
    }
}