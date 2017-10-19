import RNFirebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export const Types = {
    SIGNUP_PHONE_CHANGED: 'SIGNUP_PHONE_CHANGED',
    SIGNUP_WITH_PHONE_NUMBER: 'SIGNUP_WITH_PHONE_NUMBER',
    SIGNUP_ERROR_OCCURRED: 'SIGNUP_ERROR_OCCURRED',
    SIGNUP_LOADING: 'SIGNUP_LOADING',
    SIGNUP_LOADED: 'SIGNUP_LOADED',
    SIGNUP_COUNTRY_SELECTED: 'SIGNUP_COUNTRY_SELECTED',
    SIGNUP_RESET: 'SIGNUP_RESET',
};

export const phoneNumberChanged = (phoneNumber) => {
    return {
        type: Types.SIGNUP_PHONE_CHANGED,
        payload: phoneNumber
    };
};

export const errorOccurred = (code, message, ...trace) => {
    return {
        type: Types.SIGNUP_ERROR_OCCURRED,
        payload: { code, message, trace }
    };
};

export const selectCountry = (country) => {
    return {
        type: Types.SIGNUP_COUNTRY_SELECTED,
        payload: country.cca2.toLowerCase(),
    };
};

const signedInWithPhoneNumber = (result) => {
    return {
        type: Types.SIGNUP_WITH_PHONE_NUMBER,
        payload: result,
        prop: 'confirmationResult'
    };
};

export const showSpinner = () => {
    return {
        type: Types.SIGNUP_LOADING
    };
};

export const hideSpinner = () => {
    return {
        type: Types.SIGNUP_LOADED,
    };
};

export const signInWithPhoneNumber = (phoneNumber) => {
    return (dispatch) => {
        dispatch(showSpinner());

        const { app } = RNFirebase;
        app().auth().signInWithPhoneNumber(phoneNumber)
            .then((result) => {
                console.log('RESULT', Actions.currentScene, result);
                dispatch(signedInWithPhoneNumber(result));
                dispatch(hideSpinner());
                Actions.verifyPhoneNumber();
            })
            .catch((err) => {
                console.log(err);
                const { code, message } = err;
                dispatch(errorOccurred(code, message, err));
                dispatch(hideSpinner());
            }
        );
    };
};
