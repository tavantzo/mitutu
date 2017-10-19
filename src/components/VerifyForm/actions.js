export const checkCode = (code, confirmationResult) => {
    return (dispatch) => {
        dispatch({ type: 'loading', payload: true });
        console.log('Verify', code);
        confirmationResult.confirm(code)
            .then(() => {
                // success
                dispatch({ type: 'loading', payload: false });
            }).catch(err => {
                dispatch({ type: 'loading', payload: false });
                dispatch({
                    type: 'errorOccurred',
                    payload: err
                });
            });
    };
};

export const codeEntered = (code) => {
    return {
        type: 'codeEntered',
        payload: code
    };
};

