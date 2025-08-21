// screens/ResultScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation, texts }) => {
  const { bmiResult, bmiCategory } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts.result_title || 'BMI Result'}</Text>

      <Text style={styles.bmiValue}>
        {texts.bmi_value_label || 'Your BMI:'} {bmiResult}
      </Text>

      <Text style={styles.category}>
        {texts.bmi_category_label || 'Category:'} {bmiCategory}
      </Text>

      <Button
        title={texts.recalculate || 'Recalculate'}
        onPress={() => navigation.navigate('BmiCalculator')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  bmiValue: {
    fontSize: 24,
    marginBottom: 15,
  },
  category: {
    fontSize: 22,
    marginBottom: 40,
  },
});

export default ResultScreen;
