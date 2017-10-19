import React, { Component } from 'react';
import { ThemeProvider, getMaterialTheme } from 'material-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';
import firebase from 'react-native-firebase';
import { Reducers } from './components';
import AppRouter from './Router';

const theme = getMaterialTheme({
    theme: 'light',
});

let store = null;

export default class App extends Component {
    componentWillMount() {
        if (store === null) {
            store = createStore(Reducers, applyMiddleware(thunk));
        }

        firebase.app().auth().onAuthStateChanged((user) => {
            console.log('Auth State Changed', user);
            store.dispatch({
                type: 'AUTH_STATE_CHANGED',
                payload: user
            });

            if (!user) {
                // The user has been logged out
                // Check if the user has updated his details
            } else if (!user.email) {
                // User has to to complete the registration process
                console.log('User has to complete the sign up');
                Actions.completeSignUp();
            } else {
                // Actions.home();
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                </ThemeProvider>
            </Provider>
        );
    }
}
