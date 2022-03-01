import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getMessages} from '../../firebase/firestore/chats';
import {LoadingImage} from '../Common/LoadingImage';
import {MyText} from '../Common/MyText';

export const ChatBody = ({userId, relatedUserId}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageSubscriber = getMessages(userId, relatedUserId, setMessages);

    return () => messageSubscriber();
  }, [userId, relatedUserId]);
  console.log(messages);
  const renderMessages = ({index, item: message}) => {
    const isUser = message.from === userId;
    return (
      <View key={index} style={{padding: 5}}>
        <View
          style={[
            styles.message,
            isUser && {
              backgroundColor: 'white',
              borderColor: '#E8E8E8',
              borderWidth: 2,
              marginLeft: 'auto',
            },
          ]}>
          <MyText text={message.text} />
          <LoadingImage
            source={{uri: message.spoil.image}}
            style={[
              styles.messageSpoil,
              isUser && {left: -10, right: undefined},
            ]}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={messages}
      renderItem={renderMessages}
      style={styles.chat}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  chat: {
    padding: 15,
    height: '75%',
  },
  message: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    width: '60%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSpoil: {
    height: 30,
    width: 30,
    position: 'absolute',
    bottom: -8,
    right: -10,
  },
});
