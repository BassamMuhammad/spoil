import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getUsersByName} from '../firebase/firestore/users';
import {LoadingImage} from '../components/Common/LoadingImage';
import {MyHeading} from '../components/Common/MyHeading';
import {RelationshipHeader} from '../components/Relationship/RelationshipHeader';
import {UserList} from '../components/Relationship/UserList';
import {useSelector} from 'react-redux';
import {selectUser} from './../redux/features/userSlice';

export const CreateRelationship = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const userId = useSelector(selectUser);

  useEffect(() => {
    getUsersByName(searchText)
      .then(resUsers => setUsers(resUsers))
      .catch(e => {
        console.log(e);
        alert('Error occured. Please try again');
      });
  }, [searchText]);
  console.log(users);
  const renderUsers = ({index, item: user}) => {
    return (
      <Pressable key={index} style={styles.userContainer} onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <LoadingImage
            style={styles.profilePic}
            source={{uri: user.profilePic}}
          />
          <View>
            <MyHeading text={`${user.firstName} ${user.lastName[0]}.`} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RelationshipHeader
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <UserList userId={userId} otherUsers={users} />
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
    padding: 15,
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
});
