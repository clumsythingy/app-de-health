// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet } from 'react-native';

import { TEXTS } from './Data/text';
import BmiCalculatorScreen from './DifScreen/BMIcalc';
import ResultScreenBMI from './DifScreen/ResultBMI';               // BMI result screen
import IntroQuestionsScreen from './DifScreen/Question';
import ResultScreenQuiz from './DifScreen/ResultQuestion';         // Quiz result screen
import LanguageSelector from './Reused/LanguageSelection';
import JournalScreen from './DifScreen/Journal';
import LoginScreen from './DifScreen/Login';

const Stack = createStackNavigator();

export default function App() {
  const [language, setLanguage] = useState('en');
  const [userName, setUserName] = useState('');
  const [points, setPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {props => (
                <LoginScreen
                  {...props}
                  onLoginSuccess={(username) => {
                    setUserName(username);
                    setIsLoggedIn(true);
                  }}
                  texts={TEXTS[language]}
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              {/* Language selection */}
              <Stack.Screen
                name="Language"
                options={{ title: TEXTS[language].select_language }}
              >
                {props => (
                  <LanguageSelector {...props} setLanguage={setLanguage} />
                )}
              </Stack.Screen>

              {/* Quiz Flow */}
              <Stack.Screen
                name="IntroQuestions"
                options={{ title: TEXTS[language].health_questions || 'Health Questions' }}
              >
                {props => (
                  <IntroQuestionsScreen
                    {...props}
                    texts={TEXTS[language]}
                    points={points}
                    setPoints={setPoints}
                  />
                )}
              </Stack.Screen>

              {/* Quiz Result */}
              <Stack.Screen
                name="QuizResult"
                options={{ title: TEXTS[language].result_title || 'Results' }}
              >
                {props => (
                  <ResultScreenQuiz
                    {...props}
                    texts={TEXTS[language]}
                  />
                )}
              </Stack.Screen>

              {/* BMI Flow */}
              <Stack.Screen
                name="BmiCalculator"
                options={{ title: TEXTS[language].bmi_calculator || 'BMI Calculator' }}
              >
                {props => (
                  <BmiCalculatorScreen
                    {...props}
                    texts={TEXTS[language]}
                  />
                )}
              </Stack.Screen>

              {/* BMI Result */}
              <Stack.Screen
                name="BMIResult"
                options={{ title: TEXTS[language].result_title || 'BMI Result' }}
              >
                {props => (
                  <ResultScreenBMI
                    {...props}
                    texts={TEXTS[language]}
                  />
                )}
              </Stack.Screen>

              {/* Journal */}
              <Stack.Screen
                name="Journal"
                options={{ title: TEXTS[language].journal || 'Health Journal' }}
              >
                {props => (
                  <JournalScreen
                    {...props}
                    texts={TEXTS[language]}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
