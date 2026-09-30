import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  IS_LOGGED_IN: '@production_dashboard_is_logged_in',
  USER_EMAIL: '@production_dashboard_user_email',
};

export const saveLoginSession = async email => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.IS_LOGGED_IN,
    'true',
  );

  await AsyncStorage.setItem(
    STORAGE_KEYS.USER_EMAIL,
    email,
  );
};

export const getLoginSession = async () => {
  const isLoggedIn = await AsyncStorage.getItem(
    STORAGE_KEYS.IS_LOGGED_IN,
  );

  const email = await AsyncStorage.getItem(
    STORAGE_KEYS.USER_EMAIL,
  );

  return {
    isLoggedIn: isLoggedIn === 'true',
    email,
  };
};

export const clearLoginSession = async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.IS_LOGGED_IN,
    STORAGE_KEYS.USER_EMAIL,
  ]);
};