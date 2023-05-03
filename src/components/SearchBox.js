import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchBox extends React.PureComponent {
  render() {
    const { changeSearchParam, endEditing, placeholder } = this.props;

    return (
      <TextInput
        autoFocus
        style={styles.searchBox}
        placeholder={placeholder}
        onChangeText={changeSearchParam}
        onEndEditing={endEditing}
        autoCorrect={false}
      />
    );
  }
}

const width = Dimensions.get('window').width / 1.7;

SearchBox.propTypes = {
  changeSearchParam: PropTypes.func,
  endEditing: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchBox.defaultProps = {
  changeSearchParam: null,
  endEditing: null,
  placeholder: 'Search',
};

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    width,
    backgroundColor: '#fff',
    left: '50%',
    transform: [{ translateX: -(width / 2) }, { scaleY: 1.4 }],
    zIndex: 100,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 18,
  },
});
