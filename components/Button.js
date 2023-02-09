import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const Button = props => {
  const image = props.image ? props.image : '../assets/images/info.png';
  return (
    <TouchableOpacity
      style={{...styles.button, top: props.top, left: props.left}}
      onPress={props.press}>
      <Image
        source={require('../assets/images/info.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    opacity: 0.1,
    position: 'absolute',
    marginTop: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'black',
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Button;
