
import React, {useState, useRef, useEffect } from 'react'
import {Text, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'


const InputError = ({ display = true}) => {
  const viewElement = useRef(null); 

  useEffect(() => {
    if (display) {
      viewElement.current.animate('shake', 500, 'linear');
    } else {
      viewElement.current.animate('bounceOut', 500)
    }
  }, [display])

  const viewStyles = [styles.error, {opacity: 0}]

  if (display) {
    viewStyles.push({ opacity: 1})
  }

  return (
    <Animatable.View style={viewStyles} ref={viewElement}>
      <Text style={styles.errorText}>X</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#cc0011',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  }
})

export default InputError