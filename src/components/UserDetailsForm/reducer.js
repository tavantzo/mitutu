import Reducer from 'focus-redux-reducer';

class UserDetailsReducer extends Reducer {

    mapActionToMethod() {
        return {
            USER_DETAILS_FETCHED: this.userDataFetched,
        };
    }

    inputChanged(change) {
        return change;
    }

    userDataFetched(payload) {
        if (payload !== null) {
            const { firstName, lastName } = payload;
            return { firstName, lastName };
        }

        return { firstName: null, lastName: null };
    }

    profileUpdated(result) {
        console.log(result);
        const errors = this.state.errors;
        if (typeof result === Error) {
            errors.displayName = result;
        } else {
            errors.displayName = null;
        }

        return { errors };
    }

    detailsUpdated(result) {
        console.log(result);
        const errors = this.state.errors;
        if (typeof result === Error) {
            errors.lastName = result;
        } else {
            errors.lastName = null;
        }

        return { errors };
    }

    emailUpdated(result) {
        const errors = this.state.errors;
        if (typeof result === Error) {
            console.log('emailUpdated', result);
            errors.email = result;
        } else {
            // Send an email verification
            if (result.emailVerified === false) {
                result.sendEmailVerification();
            }

            errors.email = null;
        }

        return { errors };
    }

    userDetailsUpdated(values) {
        console.log('UPDATED RESULTS', values);
        return {};
    }

    userDetailsNotUpdated(failedReasons) {
        console.log('FAILED REASONS', failedReasons);
        return {};
    }
}

export default new UserDetailsReducer({
    errors: {
        displayName: null,
        phoneNumber: null,
        firstName: null,
        lastName: null,
        email: null,
    },
    displayName: null,
    firstName: null,
    lastName: null,
    email: null,
    user: null
});
