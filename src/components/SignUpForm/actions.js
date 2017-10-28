import OAuthManager from 'react-native-oauth';
import RNFirebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import globals from '../../globals';
import { SignUpMethods } from './index';

export const Types = {
    SIGNUP_OPEN_ALT_MODAL: 'SIGNUP_OPEN_ALT_MODAL',
    SIGNUP_PHONE_CHANGED: 'SIGNUP_PHONE_CHANGED',
    SIGNUP_WITH_PHONE_NUMBER: 'SIGNUP_WITH_PHONE_NUMBER',
    SIGNUP_WITH_EMAIL_AND_PASSWORD: 'SIGNUP_WITH_EMAIL_AND_PASSWORD',
    SIGNUP_INPUT_CHANGED: 'SIGNUP_INPUT_CHANGED',
    SIGNUP_ERROR_OCCURRED: 'SIGNUP_ERROR_OCCURRED',
    SIGNUP_LOADING: 'SIGNUP_LOADING',
    SIGNUP_LOADED: 'SIGNUP_LOADED',
    SIGNUP_COUNTRY_SELECTED: 'SIGNUP_COUNTRY_SELECTED',
    SIGNUP_RESET: 'SIGNUP_RESET',
    SIGNUP_METHOD_CHANGED: 'SIGNUP_METHOD_CHANGED',
};

export const textInputChanged = (inputProp, newValue) => {
    return {
        type: Types.SIGNUP_INPUT_CHANGED,
        payload: newValue,
        prop: inputProp
    };
}
export const phoneNumberChanged = (phoneNumber) => {
    return {
        type: Types.SIGNUP_PHONE_CHANGED,
        payload: phoneNumber
    };
};

export const errorOccurred = (code, message, field, ...trace) => {
    return {
        type: Types.SIGNUP_ERROR_OCCURRED,
        payload: { code, message, field, trace }
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

const signedInWithEmailAndPassword = (result) => {
    return {
        type: Types.SIGNUP_WITH_EMAIL_AND_PASSWORD,
        payload: result,
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

export const openAltSignUpModal = () => {
    return {
        type: Types.SIGNUP_OPEN_ALT_MODAL,
        payload: true,
        prop: 'altSignUpModalVisible'
    };
};

export const closeAltSignUpModal = () => {
    return {
        type: Types.SIGNUP_OPEN_ALT_MODAL,
        payload: false,
        prop: 'altSignUpModalVisible'
    };
};

export const selectAltSignUpMethod = (method) => {
    return {
        type: Types.SIGNUP_METHOD_CHANGED,
        payload: method,
        prop: 'signUpMethod'
    };
};

export const signInWithEmail = (email, password) => {
    return (dispatch) => {
        dispatch(showSpinner());

        const { app } = RNFirebase;

        app().auth().signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result);
                dispatch(hideSpinner());
            })
            .catch(err => {
                console.log(err);
                const { code, message } = err;

                switch (code) {
                    case 'auth/wrong-password':
                        dispatch(errorOccurred(code, message, 'password', err));
                        break;
                    case 'auth/user-not-found':
                        // Create the user or let the user create one account
                        app().auth().createUserWithEmailAndPassword(email, password)
                            .then(result => {
                                console.log('result');
                                dispatch(signedInWithEmailAndPassword(result));
                                dispatch(hideSpinner());
                            })
                            .catch(({ _code, _message, ..._err }) => {
                                dispatch(hideSpinner());
                                dispatch(errorOccurred(_code, _message, 'email', _err));
                            });
                        break;
                    case 'auth/user-disabled':
                    case 'auth/invalid-email':
                    default:
                        dispatch(errorOccurred(code, message, 'email', err));
                        dispatch(hideSpinner());
                }
            }
        );
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
                dispatch(errorOccurred(code, message, 'phoneNumber', err));
                dispatch(hideSpinner());
            }
        );
    };
};

export const externalAuthProvider = (signUpMethod) => {
    return (dispatch) => {
        const { app } = RNFirebase;
        const manager = new OAuthManager('mitutu');
        const providerId = SignUpMethods.getAuthProviderName(signUpMethod);
        let credential;
        dispatch(showSpinner());

        manager.configure(globals.config.authManager);

        manager.authorize(providerId, { scopes: 'email' })
            .then(result => {
                console.log('AUTH', result);
                const { idToken, accessToken } = result.response.credentials;

                switch (signUpMethod) {
                    case SignUpMethods.GOOGLE:
                        credential = RNFirebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                        break;
                    case SignUpMethods.FACEBOOK:
                        credential = RNFirebase.auth.FacebookAuthProvider.credential(accessToken);
                        break;
                    default:
                        throw new Error('Invalid sign in method');
                }

                app().auth().signInWithCredential(credential)
                    .then(_result => {
                        console.log('Auth 2', _result);
                        dispatch(hideSpinner());
                    })
                    .catch(({ code, message, ...trace }) => {
                        dispatch(errorOccurred(code, message, 'error', trace));
                        dispatch(hideSpinner());
                    });
            })
            .catch((err) => {
                console.log('Err', err);
                // dispatch(errorOccurred(err.code, err.message, 'error'));
                dispatch(hideSpinner());
                throw err;
            });
    };
};
