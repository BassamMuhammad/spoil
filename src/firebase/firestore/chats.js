import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const sendMessage = async (from, to, spoil, message) => {
  const id = uuid.v4();
  await firestore().doc(`chats/${id}`).set({
    id,
    from,
    to,
    spoil,
    message,
    date: firestore.Timestamp.now(),
  });
};

export const getMessages = async (user1, user2, startPos) => {
  const rawMessages = await firestore()
    .collection(`chats`)
    .where('from', 'in', [user1, user2])
    .orderBy('date', 'asc')
    .startAt(startPos)
    .limit(50)
    .get();
  const messages = [];
  rawMessages.forEach(rawMessage => {
    const message = rawMessage.data();
    if (message.to === user1 || message.to === user2) messages.push(message);
  });
  return messages;
};
