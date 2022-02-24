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

export const getUser = async userId => {
  const user = await firestore().doc(`users/${userId}`).get();
  return user.data();
};

export const changeUserInfo = async (id, firstName, lastName, dob) => {
  await firestore().doc(`users/${id}`).update({
    firstName,
    lastName,
    dob,
  });
};
