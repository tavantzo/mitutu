import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class Header extends Component {

    renderLeftButton() {
        return;
    }

    renderRightButton() {
        return;
    }

    render() {
        const { props } = this;
        const { textStyles, viewStyles } = styles;
        return (
            <View style={viewStyles}>
                {this.renderLeftButton()}
                <Text testID={'header-title'} style={textStyles}>{props.headerTitle}</Text>
                {this.renderRightButton()}
            </View>
        );
    }
}

const styles = {
    viewStyles: {
        paddingTop: 15,
        height: 60,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyles: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#000',
    }
};

