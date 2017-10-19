import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size, ...props }) => {
    return (
        <View style={[styles.spinnerStyle, props.style && props.style ]}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export { Spinner };
