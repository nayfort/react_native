import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const Spinner = React.memo(() => {
  return (
    <View style={styles.spinnerBlock}>
      <Image source={require('../../assets/spinner/spinner.gif')} />
      {/*Spinner image*/}
    </View>
  );
});

const styles = StyleSheet.create({
  spinnerBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
});

export default Spinner;
