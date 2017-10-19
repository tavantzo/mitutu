import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, colors } from 'material-native';
import { connect } from 'react-redux';
import { TextField as TextInput } from 'react-native-material-textfield';

import i18n from '../../utils/i18n';
import { Container } from '../common';
import * as Actions from './actions';

const opts = { scope: 'components.VerifyForm' };

class VerifyForm extends PureComponent {
    codeEntered(code) {
        this.props.codeEntered(code);
    }

    checkCode() {
        const code = this.props.verifyFormState.code;
        return this.props.checkCode(code, this.props.signUpFormState.confirmationResult);
    }

    render() {
        const { code } = this.props.verifyFormState;
        console.log(this.props.verifyFormState);
        return (
            <Container headerText="">

                <View style={[Styles.commonStyle, { justifyContent: 'center', alignContent: 'center', flex: 1 }]}>
                    <TextInput
                        ref='verificationCode'
                        label={i18n.t('enter_verification_code', opts)}
                        returnKeyType='done'
                        keyboardType='numeric'
                        style={Styles.inputTextStyles}
                        value={code || ''}
                        onChangeText={this.codeEntered.bind(this)}
                    />

                    <Button
                        ref='submitButton'
                        style={Styles.buttonStyle}
                        primary
                        raised
                        tintColor={colors.green400}
                        text={i18n.t('Let\'s go', opts)}
                        onPress={this.checkCode.bind(this)}
                    />

                </View>

            </Container>
        );
    }
}


export const Styles = StyleSheet.create({
    commonStyle: {
        marginHorizontal: 40,
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        height: 40
    },
    inputTextStyles: {
        fontSize: 30,
        height: 30
    }
});

const mapStateToProps = (states) => {
    const { verifyFormState, signUpFormState } = states;

    return { verifyFormState, signUpFormState };
};

export default connect(mapStateToProps, Actions)(VerifyForm);
