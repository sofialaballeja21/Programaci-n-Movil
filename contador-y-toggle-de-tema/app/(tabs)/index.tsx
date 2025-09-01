//Se puede modificar
// Versión mínima sin efectos parallax
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [ isDarkModel, setIsDarkModel] = useState(false);

  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
    
  };

  const reset = () => {
   setCount(0);

  };

  const togglerTema = () => {
    setIsDarkModel(!isDarkModel);
  };

  /*const getTextStyle = (isDarkModel) => {
    return {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDarkModel ? '#fff' : '#000',
      marginButtom: 40,

    }
  }*/
  //LOGICA
  return (
    <View style={[styles.container, isDarkModel ? styles.darkContainer : styles.lightContainer]}> 
      <Text style={styles.buttonConteiner}>
        {count}
      </Text>
        
        {count >= 10 && (
        <Text style={styles.warningText}>
          ¡Has llegado al máximo!
        </Text>
        )}

      <View style={styles.buttonConteiner}  >
        <Pressable onPress={increment}>
          <Text>Increment</Text>
        </Pressable>
      </View>
    
      <View style={styles.buttonConteiner} >
        <Pressable onPress={reset}>
          <Text>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.buttonConteiner} >
        <Pressable onPress={togglerTema}>
          <Text>Toggle Theme</Text>
        </Pressable>
      </View>



    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
    warningText: {        // Para advertencias graves
    color: '#ff4444',
    fontWeight: 'bold',
  },
  infoText: {           // Para información
    color: '#0066cc',
    fontStyle: 'italic',
  },
  successText: {        // Para éxitos
    color: '#00aa00',
    fontWeight: '600',
  },
  buttonConteiner: {
    backgroundColor: '#d88dbfff',
    padding: 15,
    borderTopLeftRadius: 15,
    margin: 3,
  },
  buttomText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold', 
    textAlign: 'center'
  }

});