import { combineReducers } from 'redux';
import firebase from 'react-native-firebase';
import AppUser from '../models/AppUser';
import globals from '../globals';

const reducers = combineReducers({
    authState: (state = {}, action) => {
        switch (action.type) {
            case 'AUTH_STATE_CHANGED':
                if (action.payload) {
                    console.log('Auth State Changed', action.payload);
                    globals.user = new AppUser(action.payload);
                    return { ...state, logged: true, user: globals.user };
                }
                globals.user = null;
                return { ...state, logged: false, user: null };
            case 'USER_DETAILS_FETCHED':
                if (state.user) {
                    const user = state.user;
                    user._userData = action.payload;
                    return { ...state, user };
                }
            break;
            case 'REAUTH_REQUIED':
            case 'SIGNOUT':
                firebase.app().auth().signOut()
                    .then(result => console.log('signOut', result))
                    .catch(err => console.log(err));
            break;
            case 'updateDefaultImage':
                return { ...state, defaultImage: action.payload };
        }

        return state;
    },
    signUpFormState: require('./SignUpForm/reducer').default,
    verifyFormState: require('./VerifyForm/reducer').default,
    userDetailsFormState: require('./UserDetailsForm/reducer').default
});

export default reducers;
