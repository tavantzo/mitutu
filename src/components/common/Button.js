import React from 'react';
import { Button as RNButton } from 'react-native';
import { connect } from 'react-redux';

import { Theme, Common } from '../styles';

class CustomButton extends React.PureComponent {
    render() {
        const { loading, style, ...props } = this.props;

        return (
            <RNButton
                style={[Common.buttonPrimaryStyleStyle, style]}
                disabled={loading}
                color={Theme.colors.primary}
                onPress={this.submitData.bind(this)}
                {...props}
            />
        );
    }
}

const mapStateToProps = (states) => {
    return {
        loading: false
    };
};

export const Button = connect(mapStateToProps)(CustomButton);
