// screens/BmiCalculatorScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Wichtig: React Native Picker importieren

const BmiCalculatorScreen = ({ texts, navigation }) => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [units, setUnits] = useState('metric');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBmi = () => {
    const ageValue = parseInt(age);
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (
      isNaN(ageValue) ||
      isNaN(heightValue) ||
      isNaN(weightValue) ||
      heightValue <= 0 ||
      weightValue <= 0
    ) {
      Alert.alert(texts.invalid);
      return;
    }

    let bmi = 0;
    if (units === 'metric') {
      const heightInM = heightValue / 100;
      bmi = weightValue / (heightInM * heightInM);
    } else {
      bmi = (weightValue / (heightValue * heightValue)) * 703;
    }

    bmi = parseFloat(bmi.toFixed(2));
    setBmiResult(bmi);

    let category = '';

    if (ageValue < 18) {
      category = texts.child;
      if (bmi < 22) category = texts.underweight;
      else if (bmi < 27) category = texts.normal;
      else category = texts.overweight;
    } else if (ageValue >= 65) {
      if (gender === 'male') {
        if (bmi < 23) category = texts.underweight;
        else if (bmi < 28) category = texts.normal;
        else category = texts.overweight;
      } else {
        if (bmi < 22) category = texts.underweight;
        else if (bmi < 27) category = texts.normal;
        else category = texts.overweight;
      }
      category += ` (${texts.senior})`;
    } else {
      if (gender === 'male') {
        if (bmi < 20.5) category = texts.underweight;
        else if (bmi < 26.5) category = texts.normal;
        else if (bmi < 32.5) category = texts.overweight;
        else category = texts.obese;
      } else {
        if (bmi < 19.5) category = texts.underweight;
        else if (bmi < 25.5) category = texts.normal;
        else if (bmi < 31.5) category = texts.overweight;
        else category = texts.obese;
      }
    }

    setBmiCategory(category);

    // Navigation zum Journal Screen
    navigation.navigate('Journal');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts.welcome_message}</Text>

      <TextInput
        style={styles.input}
        placeholder={texts.age}
        keyboardType="numeric"
        onChangeText={setAge}
        value={age}
      />

      <TextInput
        style={styles.input}
        placeholder={texts.height_cm}
        keyboardType="numeric"
        onChangeText={setHeight}
        value={height}
      />

      <TextInput
        style={styles.input}
        placeholder={texts.weight}
        keyboardType="numeric"
        onChangeText={setWeight}
        value={weight}
      />

      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label={texts.male} value="male" />
        <Picker.Item label={texts.female} value="female" />
      </Picker>

      <Picker
        selectedValue={units}
        style={styles.picker}
        onValueChange={(itemValue) => setUnits(itemValue)}
      >
        <Picker.Item label={texts.metric} value="metric" />
        <Picker.Item label={texts.imperial} value="imperial" />
      </Picker>

      <Button title={texts.calculate_bmi} onPress={calculateBmi} />

      {bmiResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {texts.bmi_result
              .replace('{bmi}', bmiResult)
              .replace('{category}', bmiCategory)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BmiCalculatorScreen;
