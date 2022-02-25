import {
  View,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getUserRelationships} from '../../firebase/firestore/relationships';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/userSlice';
import {getUsersBasedOnId} from '../../firebase/firestore/users';
import {LoadingImage} from '../../components/Common/LoadingImage';
import {MyHeading} from '../../components/Common/MyHeading';
import {MyText} from '../../components/Common/MyText';
import {Loading} from '../../components/Common/Loading';

export const Relationship = ({navigation}) => {
  const [relationships, setRelationships] = useState([]);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    getUserRelationships(userId)
      .then(res => {
        console.log('s');
        setRelationships(res);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        alert('Error occured. Please Try again');
      });
  }, [userId]);

  useEffect(() => {
    const getRelatedUsers = async () => {
      const tempRelatedUsersId = [];
      for (let relationship of relationships) {
        tempRelatedUsersId.push(
          userId === relationship.user1
            ? relationship.user2
            : relationship.user1,
        );
      }
      if (tempRelatedUsersId.length === 0) return;
      const tempRelatedUsers = await getUsersBasedOnId(tempRelatedUsersId);
      tempRelatedUsers.filter(relatedUser => {
        if (relatedUser) return relatedUser;
      });
      setRelatedUsers(tempRelatedUsers);
      setLoading(false);
    };
    getRelatedUsers().catch(e => {
      console.log(e);
      setLoading(false);
      alert('Error occured. Please Try again');
    });
  }, [relationships]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/bar_left.png')} />
        <Image source={require('../../assets/images/logo.png')} />
        <Pressable style={styles.searchButton}>
          <Image source={require('../../assets/images/search.png')} />
        </Pressable>
      </View>
      <FlatList style={{paddingHorizontal: 20}}>
        {relatedUsers.map((relatedUser, i) => (
          <Pressable
            key={i}
            style={styles.userContainer}
            onPress={() =>
              navigation.navigate('Chat', {
                userId,
                relatedUserId: relatedUser.id,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <LoadingImage
                style={styles.profilePic}
                source={{uri: relatedUser.profilePic}}
              />
              <View>
                <MyHeading
                  text={`${relatedUser.firstName} ${relatedUser.lastName[0]}.`}
                />
                <MyText text={'lorem ipsum'} color="#C4C4C4" />
              </View>
            </View>
            <View style={styles.new}>
              <MyText text="New" color="white" />
            </View>
          </Pressable>
        ))}
      </FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 45,
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
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePic: {
    borderRadius: 100,
    backgroundColor: '#F1F1F1',
    height: 70,
    width: 70,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
  },
  textContainer: {},
  new: {
    backgroundColor: '#38B5EB',
    borderRadius: 100,
    padding: 10,
  },
});
