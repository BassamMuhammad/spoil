import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const createRelationship = async (user1, user2) => {
  const id = uuid.v4();
  await firestore().doc(`relationships/${id}`).set({
    id,
    user1,
    user2,
  });
};
