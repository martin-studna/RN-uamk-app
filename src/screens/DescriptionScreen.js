import React, {useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from '../colors'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Global from '../global'

const DescriptionScreen = (props) => {

  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInput} 
        multiline
        value={description}
        onChangeText={text => setDescription(text) }
        >
      </TextInput>
      <View style={styles.buttonsContainer}>
      <View style={styles.exitButtonContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={() => props.navigation.goBack()}>
          <Text style={{color: 'black'}}>ZRUŠIT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middle}>

      </View>
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} disabled={description === ''} onPress={() => {
          Global.postDescription = description
          props.navigation.goBack()
        }}>
          <Text style={{color: 'black'}}>ULOŽIT</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: colors.shadowBackground,
    padding: 20
  },
  textInput: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 40,
    fontSize: 18,
    borderRadius: 30,
    width: '100%',
    height: '70%',
    textAlignVertical: 'top'
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,

    height: 100
  },
  exitButtonContainer: {
    width: '45%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  exitButton: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middle: {
    marginHorizontal: 15
  },
  confirmButtonContainer: {
    width: '45%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white'
  },
  confirmButton: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DescriptionScreen;
