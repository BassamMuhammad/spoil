import auth from '@react-native-firebase/auth';
import {addUserInfo} from '../firestore/users';

export const signupWithEmail = async user => {
  const userCredentials = await auth().createUserWithEmailAndPassword(
    user.email,
    user.password,
  );
  console.log(
    userCredentials.user.uid,
    user.firstName,
    user.lastName,
    user.gender,
    user.dob,
    user.email,
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
