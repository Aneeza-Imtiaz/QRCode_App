import React, { Component } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import styles from "../styles/HomeStyles"; // Import styles
import { checkPermission } from "../controls/PermissionHandler"; // Import permission hanlder 
import { BarCodeScanner } from 'expo-barcode-scanner'; // Import scanner library 
import { showAlert } from "../controls/Alert"; // Import alert handler
import { pickImage } from "../controls/ScannerHandler"; // Import scanner handler
import jsQR from "jsqr"; // Import QRCode reader library
import { encode } from 'base-64'; // Import base-64 encoding/decoding library
var BASE64_MARKER = ';base64,';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        isGranted = false,
            this.state = { imageURI: null, scanned: false };
    }

    //Method to check whether camera and gallery access permission is granted or not
    _checkPermissions = async (type) => {
        isGranted = await checkPermission(type);
        if (isGranted) {
            if (type === 1) {
                this.setState({ scanned: true });
            }
            else {
                await this._takePhoto(2);
                //Convert base64 image into unit8ClampedArray
                let imageData = await this._convertDataURIToBinary();
                const data = jsQR(imageData, 250, 250);
                if (data) {
                    this._handleBarCodeScanned(data);
                }
            }
            return true;
        }
        else {
            return false;
        }
    }

    //Method to select image from gallery
     _takePhoto = async (index) => {
        let originalImage = await pickImage(index);
        if (originalImage !== null) {
            this.setState({ imageURI: originalImage });
            return true;
        }
        return false;
    };

    //Method called when QRCode is scanned
    _handleBarCodeScanned = (data) => {
        if (data !== null) {
            this.setState({ scanned: false }, () => {
                showAlert({ title: "Scan Successful!", message: JSON.stringify(data) }, {}, { title: 'OK' });
            });
            return true;
        }
        else {
            return false;
        }
    }

    //Method to convert base64 image into unit8ClampedArray
    _convertDataURIToBinary = () => {
        if (this.state.imageURI !== null) {
            let base64Index = this.state.imageURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            let base64 = this.state.imageURI.substring(base64Index);
            let raw = encode(base64);
            let rawLength = raw.length;
            let array = new Uint8ClampedArray(new ArrayBuffer(rawLength));
            for (i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        }
        else {
            return null;
        }
    }

    //Method to display QRCode camera scanner
    _renderCameraScanner = () => {
        return (
            <BarCodeScanner
                onBarCodeScanned={this._handleBarCodeScanned}
                style={styles.scanner} />
        );
    }

    render() {

        console.disableYellowBox = true;

        return (

            <Container style={styles.container}>

                {this.state.scanned ? this._renderCameraScanner() :

                    <View style={styles.innerContainer}>

                        <Text style={styles.headerText}>Select QRCode Scan</Text>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#005169' }]} onPress={() => this._checkPermissions(1)}>
                            <Text style={styles.buttonText}>Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#91c848' }]} onPress={() => this._checkPermissions(2)}>
                            <Text style={styles.buttonText}>Gallery</Text>
                        </TouchableOpacity>

                    </View>

                }

            </Container>
        )
    }
}