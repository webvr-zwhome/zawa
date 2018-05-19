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
        backgroundColor: '#9c712f',
        borderColor: '#9c712f',
        // opacity: 1,
        // borderWidth: 0.01,

    }
});

export default class Button extends React.Component{
    constructor(){
        super();
        this.state = {
            hasFocus: false,
        }
        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
            if (e.type !== 'GamepadInputEvent') {
              return;
            }
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
                    this.props.style,
                    this.state.hasFocus ? Styles.hasFocus : null,
                ]}
                onEnter={() => this.handleEnter()}
                onExit={() => this.handleExit()}
            >
                {this.props.children}
            </View>
        )
    }
}