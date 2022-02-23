import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const addUserInfo = async (
  id,
  firstName,
  lastName,
  gender,
  dob,
  email,
) => {
  await firestore().doc(`users/${id}`).set({
    id,
    firstName,
    lastName,
    gender,
    dob,
    email: email.toLowerCase(),
  });
};
