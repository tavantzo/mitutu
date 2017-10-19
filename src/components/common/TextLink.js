import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

export const TextLink = ({ label, onPress, ...props }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            {...props}
        >
            <View style={styles.containerStyle}>
                <Text style={styles.textStyle}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    containerStyle: {
        flexWrap: 'wrap',
        flex: 1
    },
    textStyle: {
        color: 'blue',
    }
};
