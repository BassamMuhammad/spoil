import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const addUserData = async (
  id,
  firstName,
  lastName,
  gender,
  dob,
  email,
  profilePic,
  location,
) => {
  await firestore().doc(`users/${id}`).set({
    id,
    firstName,
    lastName,
    gender,
    dob,
    email: email.toLowerCase(),
    profilePic,
    location,
  });
};

export const getUser = async userId => {
  const user = await firestore().doc(`users/${userId}`).get();
  return user.data();
};
export const getUsersBasedOnId = async userIds => {
  const rawUsers = await firestore()
    .collection(`users`)
    .where('id', 'in', userIds)
    .get();
  const users = [];
  rawUsers.forEach(user => users.push(user.data()));
  return users;
};

export const getUsersBasedOnLocation = async (
  latitude,
  longitude,
  setUsers,
) => {
  const tempUsers = [];
  const user = await firestore()
    .collection(`users`)
    .where('location.coords.latitude', '>=', latitude - 30)
    .where('location.coords.latitude', '<=', latitude + 30)
    .where('location.coords.longitude', '>=', longitude - 60)
    .where('location.coords.longitude', '<=', longitude + 60)
    .get();
  user.forEach(user => {
    tempUsers.push(user.data());
  });
  setUsers(tempUsers);
};

export const changeUserData = async (id, firstName, lastName, dob) => {
  await firestore().doc(`users/${id}`).update({
    firstName,
    lastName,
    dob,
  });
};

export const deleteUserData = async id => {
  await firestore().doc(`users/${id}`).delete();
};
