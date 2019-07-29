import * as Permissions from 'expo-permissions';
import { Messages } from "../helpers/AppConstants"; // Import constants
import { showAlert } from "./Alert"; //Import alert handler

//Method used to check if camera or gallery access permission granted to this app or not.
export const checkPermission = async (index) => {
    
    try {
        //Check camera permission
        if (index === 1) {
            const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);
            if (cameraPerm === 'granted') {
                return true;
            }
            else {
                //Show alert if camera access permission not granted
                showAlert({ title: "Alert!", message: Messages.userManagement.cameraPermission }, { }, { title: 'OK'});
                return false;
            }
        }
        //Check gallery permission
        else if (index === 2) {
            const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (cameraRollPerm === 'granted') {
                return true;
            }
            else {
                 //Show alert if gallery access permission not granted
                showAlert({ title: "Alert!", message: Messages.userManagement.galleryPermission }, { }, { title: 'OK'});
                return false;
            }
        }

        else {
            return false;
        }
    }
    catch (exception) {
           //Show alert if exception caught
           showAlert({ title: "Error!", message: exception }, { }, { title: 'OK'});   
                 return false;
    }

}