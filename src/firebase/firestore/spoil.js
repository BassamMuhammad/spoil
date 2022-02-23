import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const addSpoilInfo = async (name, from, to) => {
  const id = uuid.v4();
  await firestore().doc(`spoils/${id}`).set({
    id,
    name,
    from,
    to,
    date: firestore.Timestamp.now(),
  });
};

export const getSpoils = async (userId, setSpoils) => {
  return firestore()
    .collection('spoils')
    .where('to', '==', userId)
    .orderBy('date')
    .onSnapshot(spoilsSnapshot => {
      const tempSpoils = [];
      spoilsSnapshot.forEach((spoilSnapshot, i) => {
        const tempSpoil = spoilSnapshot.data();
        tempSpoils.push(tempSpoil);
      });
      setSpoils([...tempSpoils]);
    });
};
