import auth from '@react-native-firebase/auth';
import {addUserInfo} from '../firestore/user';

export const signupWithEmail = async user => {
  const userCredentials = await auth().createUserWithEmailAndPassword(
    user.email,
    user.password,
  );
  await addUserInfo(
    userCredentials.user.uid,
    user.firstName,
    user.lastName,
    user.gender,
    user.dob,
    user.email,
  );
  return userCredentials.user.uid;
};
