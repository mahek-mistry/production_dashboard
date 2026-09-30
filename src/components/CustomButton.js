import React from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import colors from '../theme/colors';

const CustomButton = ({
  title,
  onPress,
  loading = false,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomButton;