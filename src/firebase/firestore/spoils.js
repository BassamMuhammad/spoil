import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const addSpoilInfo = async (name, image, from, to) => {
  const id = uuid.v4();
  await firestore().doc(`spoils/${id}`).set({
    id,
    name,
    from,
    image,
    to,
    date: firestore.Timestamp.now(),
  });
};

export const getSpoils = (userId, setSpoils) => {
  const isDateEqual = (date1, date2) => {
    return (
      date1.getDay() === date2.getDay() &&
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth()
    );
  };
  return firestore()
    .collection('spoils')
    .where('to', '==', `${userId}`)
    .orderBy('date', 'desc')
    .onSnapshot(spoilsSnapshot => {
      const tempSpoils = [];
      let tempDate = new Date();
      let tempSpoilDateGroup = [];
      let addedToMainList = false;
      spoilsSnapshot.forEach((spoilSnapshot, i) => {
        addedToMainList = false;
        const tempSpoil = spoilSnapshot.data();
        const spoilDate = tempSpoil.date.toDate();
        tempSpoil.date = spoilDate;
        tempSpoilDateGroup.push(tempSpoil);
        if (i !== 0 && !isDateEqual(tempDate, spoilDate)) {
          tempSpoils.push(tempSpoilDateGroup);
          tempSpoilDateGroup = [];
          tempDate = spoilDate;
          addedToMainList = true;
        }
      });
      if (!addedToMainList) tempSpoils.push(tempSpoilDateGroup);
      setSpoils(tempSpoils);
    });
};

export const getSpoilType = async name => {
  const spoilType = await firestore().doc(`spoilTypes/${name}`).get();
  return spoilType.data();
};
