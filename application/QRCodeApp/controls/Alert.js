import { Alert } from "react-native";

// Method to show alert where required in App.
export const showAlert = (body, buttonCancel, buttonDone) => {
    Alert.alert(
        body.title,
        body.message,
        [
            { text: buttonCancel.title, onPress: buttonCancel.callback },
            { text: buttonDone.title, onPress: buttonDone.callback }
        ],
        { cancelable: false }
    );
}