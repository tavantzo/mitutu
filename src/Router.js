import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Router, Scene, Stack, Drawer } from 'react-native-router-flux';
import { colors } from 'material-native';

import { I18nText } from './components/common';
import i18n from './utils/i18n';
import globals from './globals';

import {
    SignUpForm,
    VerifyForm,
    UserDetailsForm,
    Home,
    DrawerMenu } from './components';

const renderSignUpStack = () => {
    return (
        <Stack key="SignUpStack" title={i18n.t('Sign Up')} leftButtonTextStyle={{ color: colors.white }}
        titleStyle={{ color: colors.white }} >
            <Scene key="signUp" component={SignUpForm} initial />
            <Scene key="verifyPhoneNumber" component={VerifyForm} />
            <Scene key="completeSignUp" component={UserDetailsForm} />
        </Stack>
    );
};

const renderPostAuthStack = () => {

    return (
        <Drawer
                open
                back={false}
                key="home"
                contentComponent={DrawerMenu}
                drawerWidth={300}
                drawerIcon={<Icon name="menu" size={30} color={colors.white} />}
                type="replace"
                titleStyle={{ color: colors.white }}
        >
            <Scene key="main" title={i18n.t('Home')} component={Home} />
            <Scene key="editProfile" title={i18n.t('Edit Profile')} component={UserDetailsForm} />
        </Drawer>
    );
};

const AppRouter = (props) => {
    return (
        <Router sceneStyle={{flex: 1}} {...props}>
            <Scene key="root" hideNavBar navigationBarStyle={{ backgroundColor: colors.green400 }}>
            {renderSignUpStack()}
            {renderPostAuthStack()}
            </Scene>
        </Router>
    );
};

export default AppRouter;
