import React, { Component } from 'react';
import {Text } from 'native-base';
import { View, Alert } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';
import * as firebase from "firebase";
import CreatePinScreen from "./CreatePinScreen";

export default class CameraTab extends Component {
    state = {
        hasCameraPermission: null,
        hasCameraRollPermission: null,
        modalVisible: true,
        type: Camera.Constants.Type.back,
        image: {}
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({
            hasCameraPermission: status === 'granted',
            hasCameraRollPermission: statusRoll === 'granted'
        });
    }

    renderCreatePinForm = () => {
        const { navigate } = this.props.navigation;
        if(this.state.modalVisible){
            return <CreatePinScreen image={this.state.image} navigate={navigate}/>
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } if (hasCameraPermission === false) {
            return (
                <Text>
                    No access to camera
                </Text>
            );
        }
        return (
            <View style={{ flex: 1}}>
                {this.renderCreatePinForm()}
            </View>

        );
    }
}