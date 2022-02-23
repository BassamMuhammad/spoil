import {SafeAreaView, View, Image, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {MyHeading} from '../../components/Common/MyHeading';
import {MyText} from '../../components/Common/MyText';
import {getSpoils, getSpoilType} from '../../firebase/firestore/spoil';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/userSlice';

export const Spoil = () => {
  const userId = useSelector(selectUser);
  const [spoils, setSpoils] = useState([]);

  useEffect(() => {
    const spoilSubscriber = getSpoils(userId, setSpoils);
    return () => {
      spoilSubscriber();
    };
  }, [userId]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View>
        <MyHeading text="Your Spoils" fontSize={23} />
        <View style={styles.infosContainer}>
          <LinearGradient
            style={styles.infoContainer}
            colors={['#FFE37E', '#FFBC08']}>
            <MyHeading text="$14" fontSize={25} />
            <MyHeading text="Your balance" fontSize={15} />
          </LinearGradient>
          <View style={[styles.infoContainer, {backgroundColor: 'red'}]}>
            <MyHeading text="25" color="white" fontSize={25} />
            <MyHeading text="Spoils available" color="white" fontSize={15} />
          </View>
        </View>
        <ScrollView>
          {spoils.map((spoilGroup, i) => {
            return (
              <View key={i} style={{marginVertical: 5}}>
                <MyHeading text={spoilGroup[0].date.toDateString()} />
                {spoilGroup.map((spoil, j) => {
                  return (
                    <View key={j}>
                      <View style={styles.spoilContainer}>
                        <Image source={{uri: spoil.image}} style={styles.img} />
                        <View>
                          <MyHeading text={spoil.type} fontSize={18} />
                          <MyText
                            text={`Received from ${spoil.from}`}
                            color="gray"
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
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
    width: '100%',
    marginVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoContainer: {
    padding: '5%',
    paddingLeft: '2%',
    width: '45%',
    borderWidth: 3,
    borderRadius: 10,
  },
  spoilContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ECECEC',
    marginRight: 10,
  },
});
