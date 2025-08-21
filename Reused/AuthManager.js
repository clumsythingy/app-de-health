import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserData = async (username, pin) => {
  try {
    const userData = {
      username,
      pin,
      points: 0,
      streak: 0,
      lastLoginDate: new Date().toISOString(),
    };
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    Alert.alert('User-Daten gespeichert!', JSON.stringify(userData));
  } catch (e) {
    console.error('Speicherfehler:', e);
  }
};

const loginWithPIN = async (username, pin) => {
  console.log('loginWithPIN aufgerufen mit:', username, pin);
  try {
    const jsonValue = await AsyncStorage.getItem('user_data');
    console.log('Gelesene user_data:', jsonValue);
    const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userData && userData.username === username && userData.pin === pin) {
      Alert.alert('Login erfolgreich!');
      return userData;
    } else {
      Alert.alert('Ungültiger Benutzername oder PIN');
      return null;
    }
  } catch (e) {
    console.error('Login Fehler:', e);
    return null;
  }
};

export default function App() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Username:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={username}
        onChangeText={setUsername}
      />
      <Text>PIN:</Text>
      <TextInput
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        value={pin}
        onChangeText={setPin}
        secureTextEntry={true}
        keyboardType="numeric"
      />
      <Button title="Save User Data" onPress={() => storeUserData(username, pin)} />
      <View style={{ marginTop: 10 }} />
      <Button title="Login" onPress={() => loginWithPIN(username, pin)} />
    </View>
  );
}

