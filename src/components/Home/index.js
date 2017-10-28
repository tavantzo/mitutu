import React, { PureComponent } from 'react'
import { Text } from 'react-native';
import { connect } from 'react-redux';

import globals from '../../globals';
import i18n from '../../utils/i18n';
import { Container } from '../common';

class Home extends PureComponent {

    render() {
        return (
            <Container headerText={i18n.t('Home')}>
                <Text>{`Welcome home ${globals.user.displayName}`}</Text>
            </Container>
        );
    }
}

export default connect(null)(Home);
