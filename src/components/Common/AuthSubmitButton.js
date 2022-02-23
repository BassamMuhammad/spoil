import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {MyText} from './MyText';
import * as Progress from 'react-native-progress';

export const AuthSubmitButton = ({text, onPress, disabled, loading}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      disabled={disabled || loading}>
      {!loading ? (
        <MyText text={text} color="white" textAlign="center" />
      ) : (
        <Progress.Circle
          indeterminate
          size={30}
          style={{alignSelf: 'center'}}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: '#FF8112',
  },
});
