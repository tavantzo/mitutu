import ReducerBase from 'focus-redux-reducer';

import firebase from 'react-native-firebase';
import { AppUser } from '../models';
import globals from '../globals';

class Reducer extends ReducerBase {
    mapActionToMethod() {
        return {
            AUTH_STATE_CHANGED: (payload) => {
                if (payload === null) {
                    globals.user = null;
                    return { logged: false, user: null };
                }

                globals.user = payload ? new AppUser(payload) : null;
                return { logged: true, user: globals.user };
            },
            USER_DETAILS_FETCHED: (userUpdatedData) => {
                return { user: globals.user, userUpdatedData };
            },
            updateDefaultImage: (defaultImage) => { return { defaultImage }; },
            REAUTH_REQUIRED: () => this.signOut,
            SIGNOUT: () => this.signOut
        };
    }

    signOut() {
        firebase.app().auth().signOut()
        .then(result => console.log('signOut', result))
        .catch(err => console.log(err));

        return {};
    }
}

export default new Reducer();
