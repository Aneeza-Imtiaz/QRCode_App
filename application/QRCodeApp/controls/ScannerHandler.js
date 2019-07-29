import * as ImagePicker from 'expo-image-picker';
import { showAlert } from "./Alert"; //Import alert handler

//Method used to launch camera or gallery to select image.
export const pickImage = async (index) => {

    try {
        let pickerResult = null;

         //Launch camera for image
        if (index === 1) {
            pickerResult = await ImagePicker.launchCameraAsync({ allowsEditing: false, aspect: [4, 3], quality: 1 });
            if (!pickerResult.cancelled) {
                // Return image if user doesn't cancelled the process
                return pickerResult.uri;
            }
        }

        // Launch gallery for image
        else if (index === 2) {                           
            pickerResult = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images', allowsEditing: false, aspect: [4, 3], quality: 1, base64: true });
            if (!pickerResult.cancelled) {

                //Converting into Base64 image
                if (pickerResult.uri.lastIndexOf('.') > 0) {
                    let mimetype;
                    const ext = pickerResult.uri.substr(pickerResult.uri.lastIndexOf('.')).toLowerCase();
                    
                    if (ext === '.jpg' || ext === '.jpeg' || ext === '.jpe') {
                        mimetype = 'image/jpeg';
                    } else if (ext === '.png') {
                        mimetype = 'image/png';
                    } else if (ext === '.gif') {
                        mimetype = 'image/gif';
                    }

                    //Return Base64 image
                    if (mimetype) {
                        let base64 = `data:${mimetype};base64,${pickerResult.base64}`;
                        return base64;
                    }
                }
            }
        }
        else {
            return null;
        }
    }
    catch (exception) {
        //Show alert if exception caught
        showAlert({ title: "Error!", message: exception }, {}, { title: 'OK' });
        return null;
    }

}