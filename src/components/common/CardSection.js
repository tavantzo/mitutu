import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
    return (
        <View style={styles}>
            {children}
        </View>
    );
};

const styles = {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
};

export { CardSection };
