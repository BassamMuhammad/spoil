import {View, StyleSheet, Pressable, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../components/Common/MyText';
import {getUser} from '../../firebase/firestore/users';
import {Loading} from '../../components/Common/Loading';
import {LoadingImage} from '../../components/Common/LoadingImage';
import {MyHeading} from '../../components/Common/MyHeading';
import {getMessages} from '../../firebase/firestore/chats';

export const Chat = ({navigation, route}) => {
  const {userId, relatedUserId} = route.params;
  const [relatedUser, setRelatedUser] = useState(null);
  const [messagePointer, setMessagePointer] = useState(0);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getUser(relatedUserId)
      .then(user => setRelatedUser(user))
      .catch(e => {
        console.log(e);
        alert('Error occured. Try again');
      });
  }, [relatedUserId]);

  useEffect(() => {
    getMessages(userId, relatedUserId, messagePointer)
      .then(messages => setMessages[messages])
      .catch(e => {
        console.log(e);
        alert('Error occured.Try again');
      });
  }, [userId, relatedUserId]);

  return !relatedUser ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/back.png')} />
          </Pressable>
          <View>
            <MyHeading
              text="Relationship with"
              fontSize={15}
              textAlign="center"
            />
            <MyHeading
              text={`${relatedUser.firstName} ${relatedUser.lastName[0]}.`}
              textAlign="center"
            />
          </View>
          <LoadingImage
            source={{uri: relatedUser.profilePic}}
            style={styles.profilePic}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.map((message, i) => (
            <View key={i} style={styles.message}>
              <MyText text={message.text} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderBottomColor: 'rgba(200,200,200,0.5)',
    borderBottomWidth: 2,
  },
  profilePic: {
    borderRadius: 100,
    backgroundColor: '#F1F1F1',
    height: 50,
    width: 50,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
  },
  message: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
