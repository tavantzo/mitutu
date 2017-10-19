import Reducer from 'focus-redux-reducer';

class UserDetailsReducer extends Reducer {

    inputChanged(change) {
        return change;
    }

    default() {
        return {};
    }
}

export default new UserDetailsReducer({
    errors: {
        firstName: null,
        lastName: null,
        email: null,
        plateNumber: null
    },
    firstName: null,
    lastName: null,
    email: null,
    plateNumber: null
});
