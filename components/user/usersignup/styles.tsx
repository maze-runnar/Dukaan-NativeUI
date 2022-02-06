import { StyleSheet } from 'react-native';
import { buttonWidth } from './utils';

const signupstyle = StyleSheet.create({
    textInput: {
        width: '90%',
        marginBottom: 8,
        backgroundColor: "white"
    },
    registerButton: {
        "marginTop": 30,
        width: buttonWidth
    }
})

export default signupstyle;