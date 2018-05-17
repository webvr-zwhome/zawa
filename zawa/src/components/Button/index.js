import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-vr';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const Styles = StyleSheet.create({
    button: {
        backgroundColor: '#777879',
        borderRadius: 0.2,
        borderWidth: 0.01,
        borderColor: '#7b612f',
        flex: 1,
        flexDirection: 'column',
        width: 2,
        height: 0.5,
        alignItems: 'stretch',
        justifyContent: 'center', 
    },
    hasFocus: {
        backgroundColor: '#123456',
    }
});

export default class Button extends React.Component{
    constructor(){
        super();
        this.state = {
            hasFocus: false,
            // needFocus: false,
        }
        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
            if (e.type !== 'GamepadInputEvent') {
              return;
            }
            // console.log(e.eventType);
            this.handleEvent(e);
            // console.log(e);
          });
    }

    handleEvent(e) {
        // console.log(e);
        if (this.state.hasFocus 
            && e.gamepad === this.props.index 
            && e.button === this.props.button 
            && e.eventType === this.props.eventType) {
            this.props.onEvent();
        }else if(this.props.needFocus===false
                && e.gamepad === this.props.index 
                && e.button === this.props.button 
                && e.eventType === this.props.eventType){
            // e.gamepad.hapticActuators.pulse(this.props.pulse)
            console.log('gamePad: ',e.gamepad)
            this.props.onEvent();
        }
        
        
    }

    handleEnter() {
        this.setState({
            hasFocus: true,
        });
    }

    handleExit() {
        this.setState({
            hasFocus: false,
        })
    }

    render() {
        return (
            <View
                style={[
                    Styles.button,
                    this.state.hasFocus ? Styles.hasFocus : null,
                    this.props.style,
                ]}
                onEnter={() => this.handleEnter()}
                onExit={() => this.handleExit()}
            >
                {this.props.children}
            </View>
        )
    }
}