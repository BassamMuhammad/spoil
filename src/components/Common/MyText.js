import React from 'react';
import {Text} from 'react-native';

export const MyText = ({
  text,
  textAlign = 'left',
  color = 'black',
  numberOfLines,
  marginBottom,
  marginTop,
  fontSize,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}>
      {text}
    </Text>
  );
};
