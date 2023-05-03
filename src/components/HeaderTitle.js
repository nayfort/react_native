import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class HeaderTitle extends React.PureComponent {
  render() {
    const { children, title } = this.props;

    return (
      <View>
        {children}
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
    );
  }
}

HeaderTitle.propTypes = {
  title: PropTypes.string,
};

HeaderTitle.defaultProps = {
  title: '',
};

const dWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    maxWidth: dWidth / 1.7,
  },
});
