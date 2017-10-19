import React from 'react';
import { View, Text, TextInput } from 'react-native';

const InlineText = ({ label, value, onChangeText, placeholder, ...props }) => {
    const { containerStyle, labelStyle, inputStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor='#ccc'
                {...props}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 40
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    inputStyle: {
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    }
};

export { InlineText };
