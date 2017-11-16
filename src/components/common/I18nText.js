import React, { Component } from 'react';
import { Text } from 'react-native';
import i18n from '../../utils/i18n';

export { i18n };

export default class I18nText extends Component {
    render() {
        const { children, values, scope, ...props } = this.props;
        return (
            <Text {...props}>{i18n.t(children, { scope, values })}</Text>
        );
    }
}
