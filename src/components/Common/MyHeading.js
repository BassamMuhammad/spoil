import React from 'react';
import {Text} from 'react-native';

export const MyHeading = ({
  text,
  textAlign = 'left',
  color = 'black',
  fontSize = 18,
}) => {
  return (
    <Text
      style={{
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
      }}>
      {text}
    </Text>
  );
};
