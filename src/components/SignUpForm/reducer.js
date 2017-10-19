import DeviceInfo from 'react-native-device-info';
import Reducer from 'focus-redux-reducer';
import { PhoneNumberUtil,
    AsYouTypeFormatter,
    PhoneNumberType,
    PhoneNumberFormat } from 'google-libphonenumber';

import { SignUpFormTypes as types } from '../types';

console.log(arguments);

const initialState = {
    auth: null,
    confirmationResult: null,
    phoneNumber: '',
    formatted: '',
    loading: false,
    error: null,
    disableFields: false,
    cca2: DeviceInfo.getDeviceCountry().toLowerCase() || 'us'
};

const phoneUtil = PhoneNumberUtil.getInstance();

class SignUpForm extends Reducer {

    mapActionToMethod() {
        return {
            [types.SIGNUP_PHONE_CHANGED]: this.phoneNumberChanged,
            [types.SIGNUP_WITH_PHONE_NUMBER]: (payload) => { return { confirmationResult: payload }; },
            [types.SIGNUP_ERROR_OCCURRED]: (payload) => { return { error: payload, loading: false, disabled: false }; },
            [types.SIGNUP_LOADING]: () => { return { loading: true, disableFields: true }; },
            [types.SIGNUP_LOADED]: () => { return { loading: false, disableFields: false }; },
            [types.SIGNUP_COUNTRY_SELECTED]: (cca2) => { return { cca2 }; },
        };
    }

    phoneNumberChanged(raw) {
        const { cca2 } = this.state;
        const formatter = new AsYouTypeFormatter(cca2);
        const rawInput = raw.replace(/[\s().-]+/g, '');
        const { ValidationResult } = PhoneNumberUtil;
        let formatted = raw;
        let phoneNumber = null;
        let error = null;

        for (let idx = 0; idx < rawInput.length; ++idx) {
            formatted = formatter.inputDigit(rawInput.charAt(idx));
        }

        if (phoneUtil.isPossibleNumberString(raw, cca2)) {
            phoneNumber = phoneUtil.parseAndKeepRawInput(raw, cca2);
            const validateResult = phoneUtil.isPossibleNumberForTypeWithReason(phoneNumber, PhoneNumberType.MOBILE);

            switch (validateResult) {
                case ValidationResult.INVALID_COUNTRY_CODE:
                    error = { code: 'signup/invalid-country-code', message: 'Invalid phone number' };
                    break;
                case ValidationResult.TOO_LONG:
                    error = { code: 'signup/invalid-phone-number-too-long', message: 'Invalid phone number' };
                    break;
                case ValidationResult.TOO_SHORT:
                    error = { code: 'signup/invalid-phone-number-too-short', message: 'Invalid phone number' };
                    break;
                case ValidationResult.IS_POSSIBLE:
                    break;
                default:
                    error = { code: 'signup/invalid-phone-number', message: 'Invalid phone number' };
            }
        } else {
            error = { code: 'signup/invalid-phone-number', message: 'Invalid phone number' };
        }

        return {
            phoneNumber: phoneNumber && phoneUtil.format(phoneNumber, PhoneNumberFormat.E164),
            formatted,
            error
        };
    }

    default(payload, prop) {
        if (prop && typeof prop === String) {
            return { [prop]: payload };
        }

        return {};
    }
}

export default new SignUpForm(initialState);
