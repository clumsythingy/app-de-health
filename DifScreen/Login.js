import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLoginSuccess, texts }) => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_data');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (userData && userData.username === username && userData.pin === pin) {
        Alert.alert('Login erfolgreich!');
        onLoginSuccess(username);
      } else {
        Alert.alert('Ungültiger Benutzername oder PIN');
      }
    } catch (e) {
      Alert.alert('Fehler beim Einloggen');
      console.error(e);
    }
  };

  const handleRegister = async () => {
    if (!username || !pin) {
      Alert.alert('Bitte Benutzername und PIN eingeben');
      return;
    }
    try {
      const userData = {
        username,
        pin,
        points: 0,
        streak: 0,
        lastLoginDate: new Date().toISOString(),
      };
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user_data', jsonValue);
      Alert.alert('Registrierung erfolgreich! Bitte anmelden.');
    } catch (e) {
      Alert.alert('Fehler bei Registrierung');
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts?.login || 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder={texts?.username || 'Benutzername'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={texts?.pin || 'PIN'}
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="numeric"
      />
      <Button title={texts?.login || 'Login'} onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button title={texts?.register || 'Registrieren'} onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});

export default LoginScreen;
