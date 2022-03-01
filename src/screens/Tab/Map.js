import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React, {useState, useEffect} from 'react';
import {getUserRelationships} from '../../firebase/firestore/relationships';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/userSlice';
import {getUser, getUsersById} from '../../firebase/firestore/users';
import {LoadingImage} from '../../components/Common/LoadingImage';

export const Map = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const userId = useSelector(selectUser);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser(userId).then(user => {
      setUser(user);
      setRegion({
        latitude: user.location.coords.latitude,
        longitude: user.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    });
    getUserRelationships(userId)
      .then(relationships => {
        const tempRelatedUsersId = [];
        relationships.forEach(relationship => {
          if (relationship.user1 === userId)
            tempRelatedUsersId.push(relationship.user2);
          else tempRelatedUsersId.push(relationship.user1);
        });
        getUsersById(tempRelatedUsersId)
          .then(users => setRelatedUsers(users))
          .catch(e => {
            console.log(e);
            alert('Error occured');
          });
      })
      .catch(e => {
        console.log(e);
        alert('Error occured');
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/bar_left.png')} />
        <Image source={require('../../assets/images/logo.png')} />
        <Pressable style={styles.searchButton}>
          <Image source={require('../../assets/images/search.png')} />
        </Pressable>
      </View>

      {region && relatedUsers && (
        <MapView
          style={{width: '100%', height: '90%'}}
          region={region}
          onRegionChange={setRegion}>
          {relatedUsers.map((relatedUser, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: relatedUser.location.coords.latitude,
                  longitude: relatedUser.location.coords.longitude,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  <LoadingImage
                    style={{width: 50, height: 50, borderRadius: 50}}
                    source={{uri: relatedUser.profilePic}}
                  />
                </View>
                <View
                  style={{
                    width: 0,
                    height: 0,
                    borderLeftWidth: 6,
                    borderRightWidth: 6,
                    borderTopWidth: 10,
                    borderColor: 'transparent',
                    borderTopColor: 'white',
                    alignSelf: 'center',
                  }}></View>
              </Marker>
            );
          })}
        </MapView>
      )}
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
});
