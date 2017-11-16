import firebase from 'react-native-firebase';

export const textInputChanged = (prop, value) => {
    return {
        type: 'inputChanged',
        payload: { [prop]: value }
    };
};

export const updateUserDetails = ({ user, displayName, firstName, lastName, email }) => {
    const currentUser = user._user;
    return (dispatch) => {
        /**
         * Common dispatch handler
         * @param {string} type The action type to be dispatched
         */
        const resolvedHandler = (type) => {
            return (payload) => {
                console.log(type, payload);
                dispatch({
                    type,
                    payload,
                });

                return payload;
            };
        };
        // Update the files
        const promProfile = currentUser.updateProfile({ displayName })
            .then(resolvedHandler('profileUpdated'))
            .catch(resolvedHandler('profileUpdated'));
        const promEmail = currentUser.updateEmail(email)
            .then(resolvedHandler('emailUpdated'))
            .catch(err => {
                console.log('ERROR', err.code);
                if (err.code === 'auth/requires-recent-login') {
                    dispatch({
                        type: 'REAUTH_REQUIRED',
                        payload: currentUser._user.phoneNumber
                    });
                }
            });
        const promDetails = firebase.database()
            .ref(`/users/${currentUser.uid}`)
            .set({ lastName, firstName })
            .then(resolvedHandler('detailsUpdated'))
            .catch(resolvedHandler('detailsUpdated'));
        // Check the promises resolution
        Promise.all([promProfile, promEmail, promDetails])
            .then(values => {
                // succeed
                console.log('SUCCEED', values);
                dispatch({
                    type: 'userDetailsUpdated',
                    payload: values
                });
            })
            .catch(reason => {
                // Failed
                console.log('FAILED', reason);
                dispatch({
                    type: 'userDetailsNotUpdated',
                    payload: reason
                });
            });
    };
};
