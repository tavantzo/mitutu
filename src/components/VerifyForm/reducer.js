import Reducer from 'focus-redux-reducer';

class VerifyFormReducer extends Reducer {
    codeEntered(code) {
        console.log('Code', code);
        return { code, error: null };
    }

    errorOccurred(error) {
        return { error, loading: false }
    }
}

export default new VerifyFormReducer({
    result: null,
    code: null
});

