import React, { PureComponent } from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TextField as TextInput } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import i18n from '../../utils/i18n';
import { Container } from '../common';
import { Theme } from '../styles';
import * as Actions from './actions';

const opts = { scope: 'components.UserDetailsForm' };

class UserDetailsForm extends PureComponent {

    static propTypes = {
        errors: PropTypes.shape({
            displayName: PropTypes.objectOf(Error),
            firstName: PropTypes.objectOf(Error),
            lastName: PropTypes.objectOf(Error),
            email: PropTypes.objectOf(Error),
        }).isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        user: PropTypes.object.isRequired
    }

    inputTextChanged(prop, value) {
        this.props.textInputChanged(prop, value);
    }

    updateUserDetails() {
        const {
            displayName,
            firstName,
            lastName,
            email,
            user } = this.props;

        this.props.updateUserDetails({
            displayName,
            firstName,
            lastName,
            email,
            user });
    }

    render() {
        const {
            errors,
            displayName,
            firstName,
            lastName,
            email,
            user
        } = this.props;

        console.log('Verify Form', this.props);

        return (
            <Container
                headerText={i18n.t('complete_sign_up', opts)}
                childrenContainerStyles={Styles.containerStyles}
            >
                <TextInput
                    ref="displayName"
                    style={[Styles.textInputStyles]}
                    value={displayName || user.displayName}
                    onChangeText={(value) => this.inputTextChanged('displayName', value)}
                    label={i18n.t('display_name', opts)}
                    title={i18n.t('please_enter_a_display_name', opts)}
                    error={errors.displayName && i18n.t(errors.displayName.message, opts)}
                />
                <TextInput
                    ref="firstName"
                    style={[Styles.textInputStyles]}
                    value={firstName || user.firstName}
                    onChangeText={(value) => this.inputTextChanged('firstName', value)}
                    label={i18n.t('first_name', opts)}
                    title={i18n.t('please_enter_your_first_name', opts)}
                    error={errors.firstName && i18n.t(errors.firstName.message, opts)}
                />

                <TextInput
                    ref="lastName"
                    style={[Styles.textInputStyles]}
                    value={lastName || user.lastName}
                    onChangeText={(value) => this.inputTextChanged('lastName', value)}
                    label={i18n.t('last_name', opts)}
                    title={i18n.t('please_enter_your_last_name', opts)}
                    error={errors.lastName && i18n.t(errors.lastName.message, opts)}
                />

                <TextInput
                    ref="email"
                    style={[Styles.textInputStyles]}
                    value={email || user.email}
                    onChangeText={(value) => this.inputTextChanged('email', value)}
                    label={i18n.t('email_address', opts)}
                    title={i18n.t('please_enter_your_email_address', opts)}
                    keyboardType='email-address'
                    error={errors.email && i18n.t(errors.email.message, opts)}
                />

                <Button
                    raised
                    primary
                    title={i18n.t('update_details', opts)}
                    onPress={this.updateUserDetails.bind(this)}
                    color={Theme.colors.buttons}
                />
            </Container>
        );
    }
}

export const Styles = StyleSheet.create({
    containerStyles: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',

    },
    textInputStyles: {
        marginBottom: 10
    }
});

const mapStateToProps = (states) => {
    const email = states.userDetailsFormState.email
        ? states.userDetailsFormState.email
        : states.authState.email;

    return { ...states.userDetailsFormState, user: states.authState.user, email };
};

export default connect(mapStateToProps, Actions)(UserDetailsForm);
