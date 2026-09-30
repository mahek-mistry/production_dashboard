import React, {useState} from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

import colors from '../theme/colors';

import {saveLoginSession} from '../storage/storage';

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/slices/authSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Details',
        'Please enter email and password.',
      );

      return;
    }

    if (!email.includes('@')) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
      );

      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters.',
      );

      return;
    }

    try {
      setLoading(true);

      dispatch(loginStart());

      await saveLoginSession(email.trim());

      dispatch(
        loginSuccess({
          email: email.trim(),
        }),
      );

      navigation.replace('Dashboard');

    } catch (error) {
      dispatch(loginFailure());

      Alert.alert(
        'Login Failed',
        'Something went wrong. Please try again.',
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                PD
              </Text>
            </View>

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to your production dashboard
            </Text>

            <View style={styles.form}>

              <CustomInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <CustomInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
              />

            </View>

            <Text style={styles.footerText}>
              Production Dashboard
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.white,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 36,
  },
  form: {
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
    color: colors.secondaryText,
    fontSize: 13,
    marginTop: 32,
  },
});

export default LoginScreen;