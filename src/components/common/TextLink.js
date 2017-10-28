import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { colors } from "material-native";

export default ({ children, onPress, style, ...props }) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            {...props}
        >
            <View>
                <Text style={[styles.textStyle, style]}>
                    {children}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        color: colors.lightBlue200,
        flexWrap: 'wrap',
    }
});
