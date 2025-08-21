// screens/ResultScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation, texts }) => {
  const { points } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts.result_title || 'Your Results'}</Text>
      <Text style={styles.points}>
        {texts.points_earned || 'Points earned'}: {points.toFixed(1)}
      </Text>

      <Button 
        title={texts.continue || 'Continue'} 
        onPress={() => navigation.navigate('BmiCalculator')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  points: {
    fontSize: 22,
    marginBottom: 40,
  },
});

export default ResultScreen;
