import React, { Component } from 'react';
import { ThemeProvider, getMaterialTheme } from 'material-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';
import firebase from 'react-native-firebase';

import { Reducers } from './components';
import AppRouter from './Router';
import { SignUpFormTypes as Types } from './components/types';

import { AppUser } from './models';
import globals from './globals';


const theme = getMaterialTheme({
    theme: 'light',
});

export default class App extends Component {
    componentWillMount() {
        if (globals.store === null) {
            globals.store = createStore(Reducers, applyMiddleware(thunk));
        }

        const fbsApp = firebase.app();
        fbsApp.auth().onAuthStateChanged((user) => {

            globals.store.dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: user
            });

            if (user) {
                globals.user = new AppUser(user);
                globals.user.onUpdate((updatedUserData) => {
                    globals.store.dispatch({
                        type: 'USER_DETAILS_FETCHED',
                        payload: updatedUserData
                    });
                });

                if (globals.user.phoneNumber) {
                    globals.store.dispatch({
                        type: Types.SIGNUP_PHONE_CHANGED,
                        payload: globals.user.phoneNumber
                    });
                }
            } else {
                globals.user = null;
            }

            if (!user) {
                // The user has been logged out
                // Check if the user has updated his details
                Actions.signUp();
            } else if (!user.email || !user.displayName) {
                // User has to to complete the registration process
                console.log('User has to complete the sign up');
                Actions.completeSignUp();
            } else if (user.email && user.emailVerified === false) {
               // Trigger email verification
                fbsApp.auth().currentUser.sendEmailVerification()
                    .catch(err => console.log('Email Verification Error', err.message));
            } else {
                Actions.home();
            }
        });
    }

    render() {
        return (
            <Provider store={globals.store}>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                </ThemeProvider>
            </Provider>
        );
    }
}
