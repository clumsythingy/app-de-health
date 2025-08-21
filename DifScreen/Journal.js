// screens/JournalScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalScreen = ({ texts }) => {
  const [note, setNote] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const saveEntry = async () => {
    if (note.trim() === '') {
      Alert.alert('Empty Entry', 'Please write something before saving.');
      return;
    }
    const date = new Date().toISOString().split('T')[0];
    const newEntry = { date, text: note };
    try {
      const existingEntries = await AsyncStorage.getItem('journalEntries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];
      entries.push(newEntry);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
      setNote('');
      Alert.alert('Success', 'Entry saved!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save entry.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts.journal}</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder={texts.note}
        onChangeText={setNote}
        value={note}
      />
      <Button title={texts.submit} onPress={saveEntry} />
      <Text style={styles.info}>
        This is a basic journal. The data is saved locally on your device.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    minHeight: 100,
  },
  info: {
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default JournalScreen;