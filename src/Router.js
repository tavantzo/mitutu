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
    const renderRightButton = () => {
        return (
            <Icon.Button
                name="exit-to-app"
                size={24}
                color={colors.white}
                backgroundColor={colors.green400}
                title="Sign out"
                onPress={() => globals.store.dispatch({ type: 'SIGNOUT' })}
            >
                <I18nText style={{ color: colors.white }}>
                    Sign out
                </I18nText>
            </Icon.Button>
        );
    };

    return (
        <Drawer
                open
                key="home"
                title={i18n.t('Home')}
                contentComponent={DrawerMenu}
                drawerWidth={350}
                drawerIcon={<Icon name="menu" size={30} color={colors.white} />}
                type="jump"
                titleStyle={{ color: colors.white }}
                leftButtonTextStyle={{ color: colors.white }}
                renderRightButton={renderRightButton()}
            >
            <Scene key="main" component={Home} />
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
