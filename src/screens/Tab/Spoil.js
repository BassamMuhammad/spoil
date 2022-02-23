import {SafeAreaView, View, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MyHeading} from '../../components/Common/MyHeading';
import {MyText} from '../../components/Common/MyText';

export const Spoil = () => {
  return (
    <SafeAreaView>
      <View style={styles.outerContainer}>
        <MyHeading text="Your Spoils" />
        <View style={styles.infosContainer}>
          <View style={styles.infoContainer}>
            <LinearGradient colors={['#FFE37E', '#FFBC08']}>
              <MyHeading text="$14" />
              <MyText text="Your balance" />
            </LinearGradient>
          </View>
          <View style={styles.infoContainer}>
            <MyHeading text="25" />
            <MyText text="Spoils available" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: '10%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  infoContainer: {
    borderWidth: 3,
    borderRadius: 5,
  },
});
