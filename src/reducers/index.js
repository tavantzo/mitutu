import { combineReducers } from 'redux';

export const CombineReducers = combineReducers({
    authState: require('./AuthReducer').default,
    drawerMenuState: require('../components/DrawerMenu/reducer').default,
    signUpFormState: require('../components/SignUpForm/reducer').default,
    verifyFormState: require('../components/VerifyForm/reducer').default,
    userDetailsFormState: require('../components/UserDetailsForm/reducer').default
});

export default CombineReducers;
