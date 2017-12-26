import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';

import { Spinner } from './Spinner';
import { Theme, Common } from '../styles';

class CustomButton extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        hideButton: PropTypes.bool,
        activityIndicator: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.element,
            PropTypes.object
        ]),
        indicatorProps: PropTypes.object,
    }

    static defaultProps = {
        loading: false,
        hideButton: true,
        activityIndicator: Spinner,
        indicatorProps: { size: 'large' },
    }

    shouldComponentUpdate = (nextProps) => {
        return (this.props.loading !== nextProps.loading);
    }


    renderIndicator() {
        const {
            loading,
            indicatorProps } = this.props;

        const ActivityIndicator = this.props.activityIndicator;

        if (loading === false) {
            return;
        }

        return (
            <ActivityIndicator
                {...indicatorProps}
            />
        );
    }

    render() {
        const {
            loading,
            hideButton,
            style,
            ...props
        } = this.props;

        return (
            <View>
                {(loading === false || (loading && hideButton)) &&
                <Button
                    style={[Common.buttonPrimaryStyleStyle, style]}
                    disabled={loading}
                    color={Theme.colors.primary}
                    {...props}
                />}
                {this.renderIndicator()}
            </View>
        );
    }
}

export default CustomButton;
