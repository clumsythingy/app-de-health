// screens/IntroQuestionsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const IntroQuestionsScreen = ({ texts, points, setPoints, navigation }) => {
  const [water, setWater] = useState('');
  const [exercise, setExercise] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState('');
  const [diet, setDiet] = useState('');
  const [fastFood, setFastFood] = useState('');

  const handleSubmit = () => {
    let newPoints = 0;

    // Water points
    const liters = parseFloat(water);
    if (!isNaN(liters) && liters >= 0) {
      if (liters < 2) {
        newPoints += 0;
      } else if (liters <= 4) {
        newPoints += 2;
      } else {
        newPoints += 1;
      }
    } else {
      alert(texts.water_invalid);
      return;
    }

    // Exercise points
    if (exercise.toLowerCase() === 'yes' || exercise.toLowerCase() === 'ja') {
      const minutes = parseInt(exerciseMinutes);
      if (!isNaN(minutes) && minutes >= 0) {
        if (minutes < 30) newPoints += 0.5;
        else if (minutes <= 60) newPoints += 3;
        else if (minutes <= 240) newPoints += 4;
        else if (minutes <= 600) newPoints += 5;
        else if (minutes <= 1440) newPoints += 2;
        else newPoints -= 2;
      } else {
        alert(texts.exercise_invalid);
        return;
      }
    } else if (exercise.toLowerCase() === 'no' || exercise.toLowerCase() === 'nein') {
      newPoints += 0;
    } else {
      alert(texts.exercise_answer);
      return;
    }

    // Diet & Fast Food points
    if (diet.toLowerCase() === 'yes' || diet.toLowerCase() === 'ja') {
      newPoints += 2;
    } else if (diet.toLowerCase() === 'no' || diet.toLowerCase() === 'nein') {
      const ffCount = parseInt(fastFood);
      if (!isNaN(ffCount) && ffCount >= 0) {
        if (ffCount === 0) newPoints += 2;
        else if (ffCount <= 3) newPoints += 0.5;
        else newPoints -= 1;
      } else {
        alert(texts.fast_food_invalid);
        return;
      }
    } else {
      alert(texts.diet_invalid);
      return;
    }

    setPoints(newPoints);
    navigation.navigate('BmiCalculator');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>{texts.water}</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setWater} value={water} />
      <Text style={styles.label}>{texts.exercise}</Text>
      <TextInput style={styles.input} onChangeText={setExercise} value={exercise} />
      <Text style={styles.label}>{texts.exercise_minutes}</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setExerciseMinutes} value={exerciseMinutes} />
      <Text style={styles.label}>{texts.diet}</Text>
      <TextInput style={styles.input} onChangeText={setDiet} value={diet} />
      <Text style={styles.label}>{texts.fast_food}</Text>
      <TextInput style={styles.input} keyboardType="numeric" onChangeText={setFastFood} value={fastFood} />
      <Button title={texts.submit} onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default IntroQuestionsScreen;