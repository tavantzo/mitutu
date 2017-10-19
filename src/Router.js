import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { colors } from 'material-native';
import i18n from './utils/i18n';
import {
    SignUpForm,
    VerifyForm,
    UserDetailsForm } from './components';

const renderSignUpStack = () => {
    return (
        <Stack key="SignUpStack" title={i18n.t('Sign Up')}>
            <Scene key="signUp" component={SignUpForm} initial />
            <Scene key="verifyPhoneNumber" component={VerifyForm} />
            <Scene key="completeSignUp" component={UserDetailsForm} />
        </Stack>
    );
};

const AppRouter = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar navigationBarStyle={{ backgroundColor: colors.green400 }}>
            {renderSignUpStack()}
            </Scene>
        </Router>
    );
};

export default AppRouter;
