import React, { PureComponent } from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TextField as TextInput } from 'react-native-material-textfield';
// import { TextField as TextInput } from 'material-native';
import PropTypes from 'prop-types';

import i18n from '../../utils/i18n';
import { Container } from '../common';

const opts = { scope: 'components.UserDetailsForm' };

class UserDetailsForm extends PureComponent {

    static propTypes = {
        errors: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
            plateNumber: PropTypes.string
        }).isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        plateNumber: PropTypes.string
    }

    inputTextChanged(prop, value) {
        this.props.textInputChanged(prop, value);
    }

    render() {
        const {
            errors,
            firstName,
            lastName,
            email,
            plateNumber } = this.props;

        return (
            <Container
                headerText={i18n.t('complete_sign_up', opts)}
                childrenContainerStyles={Styles.containerStyles}
            >
                <TextInput
                    ref="firstName"
                    style={[Styles.textInputStyles]}
                    value={firstName || ''}
                    onChangeText={(value) => this.inputTextChanged('firstName', value)}
                    label={i18n.t('first_name', opts)}
                    title={i18n.t('please_enter_your_first_name', opts)}
                    error={errors.firstName}
                />

                <TextInput
                    ref="lastName"
                    style={[Styles.textInputStyles]}
                    value={lastName || ''}
                    onChangeText={(value) => this.inputTextChanged('lastName', value)}
                    label={i18n.t('last_name', opts)}
                    title={i18n.t('please_enter_your_last_name', opts)}
                    error={errors.lastName}
                />

                <TextInput
                    ref="email"
                    style={[Styles.textInputStyles]}
                    value={email || ''}
                    onChangeText={(value) => this.inputTextChanged('email', value)}
                    label={i18n.t('email_address', opts)}
                    title={i18n.t('please_enter_your_email_address', opts)}
                    keyboardType='email-address'
                    error={errors.email}
                />

                <TextInput
                    ref="plateNumber"
                    style={[Styles.textInputStyles]}
                    value={plateNumber || ''}
                    onChangeText={(value) => this.inputTextChanged('plateNumber', value)}
                    label={i18n.t('plate_number', opts)}
                    title={i18n.t('please_enter_your_plate_number', opts)}
                    error={errors.plateNumber}
                />

                <Button title={i18n.t('update_details', opts)} />
            </Container>
        );
    }
}

export const Styles = StyleSheet.create({
    containerStyles: {
        paddingHorizontal: 20,
        justifyContent: 'center',

    },
    textInputStyles: {
        marginBottom: 10
    }
});

const mapStateToProps = (states) => {
    return { ...states.userDetailsFormState };
};

const textInputChanged = (prop, value) => {
    return {
        type: 'inputChanged',
        payload: { [prop]: value }
    };
};

export default connect(mapStateToProps, { textInputChanged })(UserDetailsForm);