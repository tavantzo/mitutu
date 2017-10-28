/* PACKAGES */
import { Subheader, colors } from 'material-native';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { TextField as TextInput } from 'react-native-material-textfield';
import PhoneInput from 'react-native-phone-input';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';


/* CUSTOM MODULES */
import { Container, Spinner, TextLink } from '../common';
import i18n from '../../utils/i18n';
import I18nText from '../common/I18nText';
import * as Actions from './actions';

// Set the transaction scope
const opts = { scope: 'components.SignUpForm' };

export const SignUpMethods = {
    PHONE: 0,
    EMAIL: 1,
    GOOGLE: 2,
    FACEBOOK: 3,

    getAuthProviderName(method) {
        const providers = Object.keys(this);
        return providers[method].toLowerCase();
    }
};

class SignUpForm extends PureComponent {
    static propTypes = {
        formState: PropTypes.shape({
            cca2: PropTypes.string,
            confirmationResult: PropTypes.object,
            disableFields: PropTypes.bool,
            loading: PropTypes.bool,
            email: PropTypes.string,
            password: PropTypes.string,
            phoneNumber: PropTypes.string,
            formatted: PropTypes.string,
            altSignUpModalVisible: PropTypes.bool,
            signUpMethod: PropTypes.number,
            errors: PropTypes.shape({
                phoneNumber: PropTypes.object,
                email: PropTypes.object,
                password: PropTypes.object,
                error: PropTypes.object
            })
        })
    }

    static defaultProps = {
        formState: {
            signUpMethod: SignUpMethods.PHONE
        }
    }

    submitData() {
        const { signUpMethod } = this.props.formState;
        switch (signUpMethod) {
            case SignUpMethods.PHONE:
                return this.checkPhoneNumber();
            case SignUpMethods.EMAIL:
                return this.checkCredentials();
            case SignUpMethods.GOOGLE:
            case SignUpForm.FACEBOOK:
            default:
                return this.props.externalAuthProvider(signUpMethod);
        }
    }
        checkCredentials() {
        const { email, password } = this.props.formState;

        return this.props.signInWithEmail(email, password);
    }

    checkPhoneNumber() {
        const { phoneNumber } = this.props.formState;
        if (phoneNumber === null || phoneNumber.length === 0) {
            this.props.errorOccurred('signup/phone-number-empty', 'Telephone number cannot be empty', 'phoneNumber');
            return;
        }

        return this.props.signInWithPhoneNumber(phoneNumber);
    }

    phoneNumberChanged(phoneNumber) {
        return this.props.phoneNumberChanged(phoneNumber);
    }

    textInputChanged(inputField, value) {
        this.props.textInputChanged(inputField, value);
    }

    selectCountry(country) {
        return this.props.selectCountry(country);
    }

    openCountryModal() {
        return this.refs.countryPicker.openModal();
    }

    toggleOtherMethodsModal() {
        if (this.props.formState.altSignUpModalVisible) {
            this.props.closeAltSignUpModal();
        } else {
            this.props.openAltSignUpModal();
        }
    }

    selectAltSignUpMethod(method) {
        this.props.selectAltSignUpMethod(method);
    }

    renderModal() {
        const {
            altSignUpModalVisible,
        } = this.props.formState;

        if (!altSignUpModalVisible) {
            return;
        }

        return (
            <Modal
                hardwareAccelerated
                transparent
                visible
                animationType='fade'
                presentationStyle="overFullScreen"
                onRequestClose={this.toggleOtherMethodsModal.bind(this)}
            >
                <View style={Styles.modalStyle}>
                    <View style={[Styles.modalRow, Styles.modalHeaderStyle]}>
                        <TouchableWithoutFeedback
                            onPress={this.toggleOtherMethodsModal.bind(this)}
                        >
                            <Icon
                                style={{ textAlign: 'right' }}
                                name="close"
                                size={30}
                                color={colors.white}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[Styles.modalRow, Styles.modalButtonsContainerStyle]}>
                        <View style={{ marginBottom: 10 }} >
                            <FAIcon.Button
                                style={Styles.modalButtonStyle}
                                onPress={this.selectAltSignUpMethod.bind(this, SignUpMethods.PHONE)}
                                name="mobile"
                                backgroundColor={colors.green50}
                                color={colors.green500}
                                borderRadius={10}
                                iconStyle={{ marginLeft: 10, width: 18 }}
                            >
                                <I18nText scope={opts.scope} style={Styles.modalButtonTextStyle}>
                                    PHONE_NUMBER
                                </I18nText>
                            </FAIcon.Button>
                        </View>
                        <View style={{ marginBottom: 10 }} >
                            <FAIcon.Button
                                style={Styles.modalButtonStyle}
                                onPress={this.selectAltSignUpMethod.bind(this, SignUpMethods.EMAIL)}
                                backgroundColor={colors.green50}
                                color={colors.green500}
                                name='at'
                                borderRadius={10}
                                iconStyle={{ marginLeft: 10 }}
                            >
                                <I18nText scope={opts.scope} style={Styles.modalButtonTextStyle}>
                                    EMAIL
                                </I18nText>
                            </FAIcon.Button>
                        </View>
                        <View style={{ marginBottom: 10 }} >
                            <FAIcon.Button
                                style={Styles.modalButtonStyle}
                                onPress={this.selectAltSignUpMethod.bind(this, SignUpMethods.GOOGLE)}
                                backgroundColor={colors.green50}
                                color={colors.green500}
                                name='google'
                                borderRadius={10}
                                iconStyle={{ marginLeft: 10 }}
                            >
                                <I18nText scope={opts.scope} style={Styles.modalButtonTextStyle}>
                                    GOOGLE
                                </I18nText>
                            </FAIcon.Button>
                        </View>
                        <View style={{ marginBottom: 10 }} >
                            <FAIcon.Button
                                style={Styles.modalButtonStyle}
                                onPress={this.selectAltSignUpMethod.bind(this, SignUpMethods.FACEBOOK)}
                                backgroundColor={colors.green50}
                                color={colors.green500}
                                name='facebook'
                                borderRadius={10}
                                iconStyle={{ marginLeft: 10 }}
                            >
                                <I18nText scope={opts.scope} style={Styles.modalButtonTextStyle}>
                                    FACEBOOK
                                </I18nText>
                            </FAIcon.Button>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    renderPhoneFields() {
        const {
            signUpMethod,
            formatted,
            cca2,
            disableFields,
            ...state } = this.props.formState;

        const error = state.errors.phoneNumber;

        if (signUpMethod === SignUpMethods.PHONE) {
            return (
                <PhoneInput
                    ref="phoneInput"
                    onChangePhoneNumber={value => this.phoneNumberChanged(value)}
                    value={formatted}
                    textStyle={StyleSheet.flatten(Styles.inputTextStyles)}
                    textComponent={TextInput}
                    initialCountry={cca2}
                    textProps={{
                        ref: 'innerTextinput',
                        blurOnSubmit: true,
                        label: i18n.t('Mobile_telephone_number', opts),
                        placeholder: i18n.t('placeholder_mobile_phone', { defaultValue: 'e.g: +1 555 323 0023', ...opts }),
                        title: i18n.t('helper_text_mobile_phone', opts),
                        editable: !disableFields,
                        returnKeyType: 'done',
                        dataDetectorTypes: 'phoneNumber',
                        error: error && i18n.t(error.code || error.message, opts)
                    }}
                />
            );
        }
    }

    renderEmailFields() {
        const {
            signUpMethod,
            disableFields,
            email,
            password,
            errors
        } = this.props.formState;
        const emailError = errors.email;
        const passwordError = errors.password;

        if (signUpMethod === SignUpMethods.EMAIL) {
            return (
                <View>
                    <TextInput
                        ref="email"
                        label={i18n.t('email_address', opts)}
                        editable={!disableFields}
                        placeholder={i18n.t('placeholder_email', { defaultValue: 'e.g: jon.snow@wall.wos', ...opts })}
                        title={i18n.t('helper_text_email', opts)}
                        keyboardType='email-address'
                        onChangeText={this.textInputChanged.bind(this, 'email')}
                        value={email}
                        error={emailError && emailError.code}
                    />

                    <TextInput
                        secureTextEntry
                        ref='password'
                        label={i18n.t('password', opts)}
                        editable={!disableFields}
                        placeholder={i18n.t('placeholder_password', { ...opts })}
                        title={i18n.t('helper_text_password', opts)}
                        onChangeText={this.textInputChanged.bind(this, 'password')}
                        value={password}
                        error={passwordError && passwordError.code}
                    />
                </View>
            );
        }
    }

    renderGoogleFields() {
        const { error } = this.props.formState.errors;
        if (error) {
            return (
                <View>
                    <I18nText
                        scope={opts.scope}
                        style={{ color: colors.red800, textAlign: 'center' }}>
                        {error.code}
                    </I18nText>
                </View>
            );
        }
    }

    renderMethodSwitch() {
        return (
            <View style={Styles.textLinkStyles}>
                <I18nText scope={opts.scop}>
                    Not on a mobile phone?
                </I18nText>
                <TextLink
                    style={Styles.linkStyle}
                    onPress={this.toggleOtherMethodsModal.bind(this)}
                >
                    <I18nText scope={opts.scope}>Use another method to sign up</I18nText>
                </TextLink>
            </View>
        );
    }

    renderSpinner() {
        const { loading } = this.props.formState;

        if (loading) {
            return (
                <Spinner size="large" style={{ marginBottom: 20, height: 30 }} />
            );
        }
        return (
            <Button
                ref="submitButton"
                style={Styles.buttonStyle}
                disabled={loading}
                color={colors.green400}
                title={i18n.t('Let\'s go', opts)}
                onPress={this.submitData.bind(this)}
            />
        );
    }

    render() {
        return (
            <Container>

                <View style={[Styles.commonStyle, Styles.textContainerStyle]}>
                    <I18nText
                        scope={opts.scope}
                        style={Styles.welcomeTextStyle}
                    >
                        welcome_text
                    </I18nText>
                </View>

                <View style={Styles.fieldContainerStyle}>
                    {this.renderPhoneFields()}
                    {this.renderEmailFields()}
                    {this.renderGoogleFields()}
                    <View style={{ marginTop: 20 }}>
                        {this.renderSpinner()}
                    </View>
                    {this.renderMethodSwitch()}
                </View>

                {this.renderModal()}
            </Container>
        );
    }
}
/**
 * @param StyleSheet
 */
export const Styles = StyleSheet.create({
    commonStyle: {
        marginHorizontal: 20,
    },
    textContainerStyle: {
        flex: 1,
        flexWrap: 'wrap',
        flexGrow: 1,
        justifyContent: 'center'
    },
    fieldContainerStyle: {
        flexGrow: 2,
        flex: 2,
        marginHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'center',
    },
    buttonStyle: {
        height: 30,
        marginTop: 20,
        elevation: 4
    },
    inputTextStyles: {
        fontSize: 20,
        height: 30
    },
    textLinkStyles: {
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    linkStyle: {
        color: colors.blue500,
    },
    welcomeTextStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600',
    },
    modalStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        justifyContent: 'center',
    },
    modalRow: {
        marginHorizontal: 40,
        marginBottom: 10,
    },
    modalHeaderStyle: {
        paddingHorizontal: 20
    },
    modalButtonsContainerStyle: {
        paddingHorizontal: 40,
        backgroundColor: colors.white,
        padding: 40,
        borderRadius: 10,
    },
    modalButtonStyle: {
        elevation: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    modalButtonTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,

    }
});

const mapStateToProps = (states) => {
    const { signUpFormState } = states;
    return { formState: signUpFormState };
};

export default connect(mapStateToProps, Actions)(SignUpForm);
