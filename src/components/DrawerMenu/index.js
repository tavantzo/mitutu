import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar, colors } from 'material-native';
import { connect } from 'react-redux';
import { getImageSource } from 'react-native-vector-icons/MaterialIcons';

import { Card, CardSection } from '../common';

class DrawerMenu extends PureComponent {

    componentWillMount() {
        getImageSource('person', 80, colors.grey500)
            .then(source => {
                this.props.defaultImageFetched(source);
            });
    }

    getUserImage() {
        const { user, defaultImage } = this.props;
        const source = user.photoURL ? { uri: user.photoURL } : defaultImage;
        return <Image source={source} style={{ height: 100, width: 100 }} />;
    }

    render() {
        const { user } = this.props;

        return (
            <View>
                <Card>
                    <CardSection>
                        <Avatar
                            image={this.getUserImage()}
                            size={100}
                        />
                    </CardSection>
                </Card>
                <Text>{`Welcome home ${user.displayName}`}</Text>
            </View>
        );
    }
}

const defaultImageFetched = (source) => {
    return {
        type: 'updateDefaultImage',
        payload: source,
        prop: 'defaultImage'
    }
};

const mapStateToProps = (states) => {
    return {
        user: states.authState.user,
        defaultImage: states.authState.defaultImage
    };
};

export default connect(mapStateToProps, { defaultImageFetched })(DrawerMenu);
