import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TEXTS } from '../Data/text';               

//applicacion de la mes da informatica de jesus y salud\App.js

const LanguageSelector = ({ navigation, setLanguage }) => {
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    navigation.navigate('IntroQuestions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your personal Health Journal!</Text>
      <Text style={styles.subtitle}>Please select a language / Bitte wähle eine Sprache</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="English"
          onPress={() => handleSelectLanguage('en')}
        />
        <Button
          title="Deutsch"
          onPress={() => handleSelectLanguage('de')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
});

export default LanguageSelector;