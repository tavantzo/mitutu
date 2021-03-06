import { StyleSheet } from 'react-native';
import { colors as Colors } from 'material-native';

export { Styles as SignUpFormStyles } from './SignUpForm';

export const Theme = {
    colors: {
        primary: Colors.green400
    }
};

export const Common = StyleSheet.create({
    buttonPrimaryStyle: {
        height: 30,
        marginTop: 20,
        elevation: 4
    }
});
