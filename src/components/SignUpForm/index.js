/* PACKAGES */
import { Subheader, Button, colors } from 'material-native';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField as TextInput } from 'react-native-material-textfield';
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import { connect } from 'react-redux';

/* CUSTOM MODULES */
import { Container, Spinner } from '../common';
import i18n from '../../utils/i18n';
import I18nText from '../common/I18nText';
import * as Actions from './actions';

// Set the transaction scope
const opts = { scope: 'components.SignUpForm' };

class SignUpForm extends PureComponent {
    static propTypes = {
        formState: PropTypes.shape({
            cca2: PropTypes.string,
            confirmationResult: PropTypes.object,
            disableFields: PropTypes.bool,
            loading: PropTypes.bool,
            phoneNumber: PropTypes.string,
            formatted: PropTypes.string
        })
    }

    shouldComponentUpdate() {
        return true;
    }

   checkPhoneNumber() {
        const { phoneNumber } = this.props.formState;

        if (phoneNumber === null || phoneNumber.length === 9) {
            console.log(this.state);
            this.props.errorOccurred('signup/phone-number-empty', 'Telephone number cannot be empty');
            return;
        }

        return this.props.signInWithPhoneNumber(phoneNumber);
    }

    phoneNumberChanged(phoneNumber) {
        return this.props.phoneNumberChanged(phoneNumber);
    }

    selectCountry(country) {
        this.refs.phoneInput.selectCountry(country.cca2.toLowerCase());

        return this.props.selectCountry(country);
    }

    openCountryModal() {
        return this.refs.countryPicker.openModal();
    }

    renderSpinner({ loading }) {
        return (
            <View style={{ justifyContent: 'space-between', alignContent: 'center'}}>
                {loading && <Spinner size="large" style={{ marginBottom: 20, height: 30 }} />}
                <Button
                    ref="submitButton"
                    style={Styles.buttonStyle}
                    primary
                    raised
                    disabled={loading}
                    tintColor={colors.green400}
                    text={i18n.t('Let\'s go', opts)}
                    onPress={this.checkPhoneNumber.bind(this)}
                />
            </View>
        );
    }

    render() {
        const { cca2, disableFields, formatted, ...state } = this.props.formState;
        return (
            <Container headerText={i18n.t('signup_subheader', opts)}>

                <View style={[Styles.commonStyle, Styles.textContainerStyle]}>
                    <I18nText scope={ opts.scope }>
                        welcome_text
                    </I18nText>
                </View>

                <View style={[Styles.commonStyle, Styles.fieldContainerStyle]}>
                    <PhoneInput
                        ref="phoneInput"
                        onChangePhoneNumber={value => this.phoneNumberChanged(value)}
                        onPressFlag={this.openCountryModal.bind(this)}
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
                            error: state.error && i18n.t(state.error.code || state.error.message, opts)
                        }}
                    />

                    <CountryPicker
                        ref="countryPicker"
                        filterable
                        onChange={value => this.selectCountry(value)}
                        translation='eng'
                        cca2={cca2}
                    >
                        <View />
                    </CountryPicker>

                    {this.renderSpinner(state)}
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
    textContainerStyle: {
        flex: 1
    },
    fieldContainerStyle: {
        flex: 1,
        justifyContent: 'space-around',
    },
    buttonStyle: {
        height: 40
    },
    inputTextStyles: {
        fontSize: 20,
        height: 30
    }
});

const mapStateToProps = (states) => {
    const { signUpFormState } = states;
    return { formState: signUpFormState };
};

export default connect(mapStateToProps, Actions)(SignUpForm);
