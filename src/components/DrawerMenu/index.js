import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, colors } from 'material-native';
import { connect } from 'react-redux';
import Icon, { getImageSource } from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

import { I18nText } from '../common';
import globals from '../../globals';

class DrawerMenu extends PureComponent {

    componentWillMount() {
        getImageSource('person-outline', 100, colors.grey500)
            .then(source => {
                this.props.defaultImageFetched(source);
            });
    }

    getUserImage() {
        const { user, defaultImage } = this.props;
        const source = user && user.photoURL ? { uri: user.photoURL } : defaultImage;
        return <Image source={source} style={{ height: 130, width: 130 }} />;
    }

    getMenuItems() {
        return [
            {
                key: 'inbox',
                label: 'Inbox',
                handler: () => Actions.myVechicles()
            }, {
                key: 'my-vehicles',
                label: 'My vehicles',
                handler: () => Actions.myVechicles()
            }
       ];
    }

    clickedItem(key) {
        this.props.clickedItem(key);
    }

    //#region renders
    renderUserDetails() {
        const { user } = this.props;
        console.log(this.props);

        if (!user) {
            return <View />;
        }
        return (
            <View style={Styles.userDetailsContainerStyle}>

                <Avatar
                    image={this.getUserImage()}
                    size={130}
                />

                <View style={Styles.userDetailsInnerContainerStyle}>
                    <Text style={Styles.userDetailHeadingStyle}>{user.displayName}</Text>
                    <Text style={Styles.userDetailTextStyle}>{user.firstName} {user.lastName}</Text>
                    <Text style={Styles.userDetailTextStyle}>{user.email}</Text>
                    <Text style={Styles.userDetailTextStyle}>{user.phoneNumber}</Text>

                    <View style={Styles.buttonsContainer}>

                        <Icon.Button
                            name='edit'
                            size={14}
                            backgroundColor={colors.grey900}
                            color={colors.grey500}
                            style={Styles.iconButtonStyle}
                            onPress={() => {
                                Actions.editProfile();
                                globals.store.dispatch({ type: 'USER_PROFILE_EDIT' });
                            }}
                        >
                            <I18nText scope="components.DrawerMenu" style={Styles.inlineIconStyle}>
                                Edit
                            </I18nText>
                        </Icon.Button>

                        <Icon.Button
                            name='exit-to-app'
                            size={14}
                            backgroundColor={colors.grey900}
                            color={colors.grey500}
                            style={Styles.iconButtonStyle}
                            onPress={() => globals.store.dispatch({ type: 'SIGNOUT' })}
                        >
                            <I18nText scope="components.DrawerMenu" style={Styles.inlineIconStyle}>
                                Sign out
                            </I18nText>
                        </Icon.Button>

                    </View>
                </View>

            </View>
        );
    }

    renderMenu() {
        return (
            <FlatList
                bounces={false}
                data={this.getMenuItems()}
                renderItem={this.renderMenuItem.bind(this)}
            />
        );
    }

    renderMenuItem({ item }) {
        return (
            <TouchableWithoutFeedback
                key={item.key}
                onPress={() => {
                    this.clickedItem(item.key);
                    item.handler.call(this);
                }}
            >
                <View style={Styles.menuItem}>
                    <Text style={Styles.menuItemText}>{item.label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View>
                {this.renderUserDetails()}
                {this.renderMenu()}
            </View>
        );
    }
    ////#endregion renders
}

export const Styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    userDetailsContainerStyle: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',
        backgroundColor: colors.grey900,
    },
    menuItem: {

        marginVertical: 5,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    menuItemText: {
        fontSize: 18,
        color: colors.grey500,
        textAlign: 'right',
        flex: 1
    },
    userDetailsInnerContainerStyle: { flex: 1, marginLeft: 10 },
    userDetailHeadingStyle: { fontSize: 24, color: colors.grey300 },
    userDetailTextStyle: { fontSize: 12, color: colors.grey500, fontStyle: 'italic' },
    iconButtonStyle: { alignItems: 'baseline', flex: 1 },
    inlineIconStyle: { fontSize: 14, color: colors.grey500 },
});

const defaultImageFetched = (source) => {
    return {
        type: 'updateDefaultImage',
        payload: source,
        prop: 'defaultImage'
    };
};

const clickedItem = (key) => {
    return {
        type: 'menuItemClicked',
        payload: key
    };
};

const mapStateToProps = (states) => {
    return {
        ...states.drawerMenuState,
        user: states.authState.user,
        defaultImage: states.authState.defaultImage
    };
};

export default connect(mapStateToProps, { defaultImageFetched, clickedItem })(DrawerMenu);
