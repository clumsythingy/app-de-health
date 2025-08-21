import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserData = async (username, pin) => {
  try {
    const userData = {
      username: username,
      pin: pin, // Note: This is NOT secure for real passwords
      points: 0,
      streak: 0,
      lastLogin:
    };
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('user_data', jsonValue);
  } catch (e) {
    console.error('Error saving user data', e);
  }
};

const login = async (username, pin) => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_data');
    const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userData && userData.username === username && userData.pin === pin) {       //checks existence
      console.log('Login successful!');
      return userData;               // Return the user data hopefully????
    } else {
      console.log('Invalid user or pin.');
      return null;
    }
  } catch (e) {
    console.error('Error during login', e);
    return null;
  }
};

const updateUserData = async (newPoints, newStreak) => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_data');
    const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userData) {
      userData.points = newPoints;
      userData.streak = newStreak;
      const updatedJsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user_data', updatedJsonValue);
      console.log('User data updated successfully.');
    }
  } catch (e) {
    console.error('Error updating user data', e);
  }
};

//streakshit
const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleStreak = async (userData) => {
  const currentDate = new Date();
  const formattedCurrentDate = getFormattedDate(currentDate);

import AsyncStorage from '@react-native-async-storage/async-storage';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const updateStreak = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_data');
    const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userData) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);                             // Normalize day

      let lastLogin = userData.lastLoginDate ? new Date(userData.lastLoginDate) : null;
      let streak = userData.streak || 0;

      if (lastLogin) {
        lastLogin.setHours(0, 0, 0, 0);                        // Normalize stored date

        const timeDifference = today.getTime() - lastLogin.getTime();
        
        if (timeDifference === ONE_DAY_IN_MS) {
          streak += 1;                  // User logged in on consecutive days
        } else if (timeDifference > ONE_DAY_IN_MS) {                                
          streak = 1;                   // User missed a day, streak is broken
        }
                //for me: If timeDifference is 0 (same day login), the streak doesn't change
      } else {
        // First ever login, start a new streak
        streak = 1;
      }
      
      userData.streak = streak;
      userData.lastLoginDate = today.toISOString();             // Store the new date
      
      const updatedJsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user_data', updatedJsonValue);
      
      return streak; // Return the new streak value
    }
  } catch (e) {
    console.error('Error updating streak', e);
  }
};

import { loginWithPIN, updateStreak } from './AuthService.js';

const handleLogin = async (username, pin) => {
  const user = await loginWithPIN(username, pin);
  if (user) {
                       // Login successful, now update the streak
    const newStreak = await updateStreak();
    console.log(`Current streak: ${newStreak}`);
  } else {
    // Show error to stupido user
  }
};

export const getStreakWarning = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_data');
    const userData = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (userData && userData.lastLoginDate) {
      const today = new Date();
      const lastLogin = new Date(userData.lastLoginDate);
      const timeDifference = today.getTime() - lastLogin.getTime();
      
      // Check if it's been more than 1 day but less than 2
      if (timeDifference > ONE_DAY_IN_MS && timeDifference < 2 * ONE_DAY_IN_MS) {
        return "Your streak is about to break! Log in today to keep it going.";
      }
    }
    return null; // No warning needed
  } catch (e) {
    console.error('Error getting streak warning', e);
    return null;
  }
};