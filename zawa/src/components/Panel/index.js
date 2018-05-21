/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-05-18 23:08:16 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-05-21 05:57:43
 */
import React from 'react';
import {
    View,
    Text,
    Image,
    asset,
    StyleSheet,
    VrHeadModel,
} from 'react-vr';
import Button from '../Button';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const Styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center', 
        transform: [
            { translate: [0, 5, -10] },
            { rotateY: 0 }
        ],
        width: 5.5,
        // height: 5,
        backgroundColor: '#333',
        // opacity: 0.7,
        // borderRadius: 0.2,
        // borderWidth: 0.01, 
        paddingBottom: 0.4,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center', 
        marginHorizontal: 0.5,
        marginVertical: 0.1,
    },
    text: {  
        fontSize: 0.2, 
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
    },
    titleWrapper: {
        // backgroundColor: '#ff0',
        height: 0.5,
    },
    gameWrapper: {
        height: 2,
    },
    buttonWrapper: {
        height: 0.5,
    },
    imageWrapper: {
        width: 3.8,
        height: 2,
        borderRadius: 0,
        borderWidth: 0,
        marginHorizontal: 0.1,
    },
    image: {
        // width: 4.2,
        height: '100%',
    },
    button: {
        height: 0.4,
        borderWidth: 0.01,
        borderRadius: 0.01,
        borderColor: '#ccc',
        backgroundColor: '#333',
        marginHorizontal: 0.2,

        // backgroundColor: '#9c712f',
        // borderColor: '#9c712f',
    }
});

export default class Panel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mode: props.mode || 'home', // ['home', 'game-jumping', 'game-rollercoaster']
            display: false,
            rotation: VrHeadModel.rotation()[1],
            position: VrHeadModel.position(),
        }

        RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
            if (e.type !== 'GamepadInputEvent') {
              return;
            }
            // display planel
            if (e.gamepad === 1 && e.button === 1) {
                var position = VrHeadModel.position();
                var rotation = VrHeadModel.rotation()[1];
                console.log('rotation', rotation);
                if(e.eventType === 'keydown') {
                    this.setState({
                        display: true,
                        rotation: rotation,
                        position: [ position[0], position[1], position[2] - 5],
                    })
                }
                if(e.eventType === 'keyup') {
                    this.setState({
                        display: false,
                    })
                }
            }
          });
    }
    onCancel() {
        
    }

    render() {
        const { 
                onEnterJumping, 
                onEnterRollerCoaster, 
                onBackHome, 
                onStartJumping,
                onStartRollerCoaster, 
            } = this.props;
        const {
            mode,
            display,
            position,
            rotation,
        } = this.state;
        return (
             !display ? null : 
            <View
                style={[
                    Styles.wrapper,
                    this.props.style,
                    {
                        transform: [
                            { translate: position },
                            { rotateY: rotation },
                        ]
                    }
                ]}>
                <View style={[Styles.row, Styles.titleWrapper]}>                
                    <Text style={[
                        Styles.text, 
                        {        
                            fontSize: 0.4,
                            fontWeight: 'bold',
                        }
                    ]}>Control Panel</Text>
                </View>
                {
                    mode !== 'home' ? null :
                    <View style={[Styles.row, Styles.gameWrapper]}> 
                        <Button 
                            style={[Styles.imageWrapper]}
                            index={0}
                            button={3}
                            eventType={'keydown'}
                            onEvent={() => {onEnterJumping()}}>   
                            <Image 
                                style={[Styles.image]} 
                                source={asset('jumping.png')}/>
                            {/* <Text style={Styles.text}>Jumping</Text> */}
                        </Button>
                        <Button 
                            style={[Styles.imageWrapper]}
                            index={0}
                            button={3}
                            eventType={'keydown'}
                            onEvent={() => {onEnterRollerCoaster()}}>     
                            <Image 
                                style={[Styles.image]} 
                                source={asset('rollercoaster.png')}/>
                            {/* <Text style={Styles.text}>RollerCoaster</Text> */}
                        </Button>
                    </View>
                }
                {
                    mode !== 'game-jumping' ? null :
                    <View> 
                        <Text style={Styles.text}>The experience may cause discomfot, continue ?</Text>
                    </View>
                }
                {
                    mode !== 'game-rollercoaster' ? null : 
                    <View> 
                        <Text style={Styles.text}>The experience may cause discomfot, continue ?</Text>
                    </View>
                }
                
                <View style={[Styles.row, Styles.buttonWrapper]}>
                    <Button
                        style={[Styles.button]}
                        index={0}
                        button={3}
                        eventType={'keydown'}
                        onEvent={() => {onBackHome()}}>                    
                        <Text style={[
                            Styles.text,    
                            {        
                                fontSize: 0.2,
                                fontWeight: 'bold',
                            }
                        ]}>Home</Text>
                    </Button>
                    {
                        mode !== 'home' ? null :  
                        <Button
                            style={[Styles.button]}
                            index={0}
                            button={3}
                            eventType={'keydown'}
                            onEvent={() => {this.onCancel()}}>
                            <Text style={[
                                Styles.text,     
                                {        
                                    fontSize: 0.2,
                                    fontWeight: 'bold',
                                }
                            ]}>Cancel</Text>
                        </Button>
                    }
                    {
                        mode !== 'game-jumping' ? null :  
                        <Button
                            style={[Styles.button]}
                            index={0}
                            button={3}
                            eventType={'keydown'}
                            onEvent={() => {onStartJumping()}}>
                            <Text style={[
                                Styles.text,
                                {        
                                    fontSize: 0.2,
                                    fontWeight: 'bold',
                                }
                            ]}>Continue</Text>
                        </Button>
                    }
                    {
                        mode !== 'game-rollercoaster' ? null :  
                        <Button
                            style={[Styles.button]}
                            index={0}
                            button={3}
                            eventType={'keydown'}
                            onEvent={() => {onStartRollerCoaster()}}>
                            <Text style={[
                                Styles.text,   
                                {        
                                    fontSize: 0.2,
                                    fontWeight: 'bold',
                                }
                            ]}>Continue</Text>
                        </Button>
                    }   
                </View>
            </View>
        )
    }
}