import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Modal, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const buttons = ['C', '+/-', '%', 'x^y', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'DEL', '='];

  const calculator = () => {
    let expression = currentNumber.replace(/\^/g, '**');
    
    let lastArr = expression[expression.length - 1];
    
    if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber);
      return;
    }
    
    try {
      let result = eval(expression).toString();
      setCurrentNumber(result);
      setHistory([...history, `${currentNumber} = ${result}`]);
    } catch (error) {
      setCurrentNumber('Error');
    }
  };

  const handleInput = (buttonPressed) => {
    Vibration.vibrate(35);

    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/' || buttonPressed === '^') {
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (buttonPressed === '1' || buttonPressed === '2' || buttonPressed === '3' || 
               buttonPressed === '4' || buttonPressed === '5' || buttonPressed === '6' || 
               buttonPressed === '7' || buttonPressed === '8' || buttonPressed === '9' || 
               buttonPressed === '0' || buttonPressed === '.') {
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      
      case 'C':
        setLastNumber('');
        setCurrentNumber('');
        return;

      case '=':
        setLastNumber(currentNumber + '=');
        calculator();
        return;

      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;

      case '%':
        setCurrentNumber((parseFloat(currentNumber) / 100).toString());
        return;
      
      case 'x^y':
        setCurrentNumber(`${currentNumber}^`);
        return;
      
      case 'History':
        setIsModalVisible(true);
        return;
    }
  };

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#fff',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b896',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#85B7B8' : '#47c7c7',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '0%',
      margin: 15,
      backgroundColor: darkMode ? '#7B8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    historyButton: {
      alignSelf: 'flex-end',
      margin: 15,
      backgroundColor: darkMode ? '#7B8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#fff' : '#000',
      borderWidth: 2,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '22%',
      minHeight: '29%',
      flex: 2,
      backgroundColor: darkMode ? '#3e4e5a' : '#fff',
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 24,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: darkMode ? '#282f3b' : '#fff',
      padding: 20,
    },
    modalContent: {
      width: '100%',
      maxHeight: '70%',
    },
    modalButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: darkMode ? '#7B8084' : '#e5e5e5',
      borderRadius: 5,
      alignItems: 'center',
    },
    modalText: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 18,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={() => handleInput('History')}>
          <Entypo name='trash' size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal}>
          <ScrollView style={styles.modalContent}>
            {history.map((entry, index) => (
              <Text key={index} style={styles.modalText}>{entry}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.modalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
