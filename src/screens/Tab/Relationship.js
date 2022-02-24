import {View, StyleSheet, Image, Pressable, ScrollView} from 'react-native';
import React from 'react';

export const Relationship = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/bar_left.png')} />
        <Image source={require('../../assets/images/logo.png')} />
        <Pressable style={styles.searchButton}>
          <Image source={require('../../assets/images/search.png')} />
        </Pressable>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  searchButton: {
    elevation: 15,
    shadowColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 2,
    shadowOpacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
