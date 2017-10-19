import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ children, onPress }) => {
    const { touchableStyles, textStyle } = styles;

    return  (
        <TouchableOpacity
            onPress={onPress}
            style={touchableStyles}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    touchableStyles: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007aff',
        borderRadius: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    }
};

export { Button };
