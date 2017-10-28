import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Subheader, colors } from 'material-native';

export default ({
    headerText,
    style,
    children,
    headerStyles,
    childrenContainerStyles,
    ...props }) => {
    const scrollable = props.scrollable || false;

    return (
        <View
            style={[Styles.containerStyles, style]}
            {...props}
        >
            {headerText &&
            <Subheader
                style={[Styles.subHeaderStyle, headerStyles]}
                text={headerText}
            />}
            {scrollable &&
            <ScrollView
                style={[Styles.childrenContainerStyles, childrenContainerStyles]}
            >
            {children}
            </ScrollView>}
            {scrollable === false &&
            <View
                style={[Styles.childrenContainerStyles, childrenContainerStyles]}
            >
            {children}
            </View>}
        </View>
    );
};

export const Styles = StyleSheet.create({
    containerStyles: {
        flex: 1,
        backgroundColor: colors.green50
    },
    childrenContainerStyles: {
        flex: 1
    },
    subHeaderStyle: {
        alignSelf: 'flex-start'
    }
});
