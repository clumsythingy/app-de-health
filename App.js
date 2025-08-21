import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

import { TEXTS } from '../Data/text';
import BmiCalculatorScreen from './DifScreen/BMIcalc';
import IntroQuestionsScreen from './DifScreen/Question';
import LanguageSelector from './Reused/LanguageSelection';
import JournalScreen from './DifScreen/Journal';

const Stack = createStackNavigator();

export default function App() {
  const [language, setLanguage] = useState('en');
  const [userName, setUserName] = useState('');
  const [points, setPoints] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Language">
          <Stack.Screen name="Language" options={{ title: TEXTS[language].select_language }}>
            {props => <LanguageSelector {...props} setLanguage={setLanguage} />}
          </Stack.Screen>
          <Stack.Screen name="IntroQuestions" options={{ title: 'Health Questions' }}>
            {props => (
              <IntroQuestionsScreen
                {...props}
                texts={TEXTS[language]}
                points={points}
                setPoints={setPoints}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="BmiCalculator" options={{ title: 'BMI Calculator' }}>
            {props => <BmiCalculatorScreen {...props} texts={TEXTS[language]} />}
          </Stack.Screen>
          <Stack.Screen name="Journal" options={{ title: 'Health Journal' }}>
            {props => <JournalScreen {...props} texts={TEXTS[language]} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});