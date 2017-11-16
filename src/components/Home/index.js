import React, { PureComponent } from 'react'
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { FAB, colors } from 'material-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import globals from '../../globals';
import i18n from '../../utils/i18n';
import { Container } from '../common';

class Home extends PureComponent {

    render() {
        return (
            <Container headerText={i18n.t('Home')}>
                {/* Render the message list */}

                <FlatList />

                <FAB
                    solid
                    tintColor={colors.pink600}
                    icon={<Icon name="send" size={30} style={{ color: colors.white }} />}
                    style={{ position: 'absolute', right: 15, bottom: 15 }}
                />
            </Container>
        );
    }
}

export default connect(null)(Home);
