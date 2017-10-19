import { combineReducers } from 'redux';

const reducers = combineReducers({
    authState: (state = {}, action) => {
        switch (action.type) {
            case 'AUTH_STATE_CHANGED':
                return { ...state, user: action.payload };
            default:
                return state;
        }
    },
    signUpFormState: require('./SignUpForm/reducer').default,
    verifyFormState: require('./VerifyForm/reducer').default,
    userDetailsFormState: require('./UserDetailsForm/reducer').default
});

export default reducers;
