import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const addSpoilData = async (name, image, from, to) => {
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
      spoilsSnapshot.forEach((spoilSnapshot, i) => {
        const tempSpoil = spoilSnapshot.data();
        const spoilDate = tempSpoil.date.toDate();
        tempSpoil.date = spoilDate;
        if (i !== 0 && !isDateEqual(tempDate, spoilDate)) {
          console.log('here');
          tempSpoils.push(tempSpoilDateGroup);
          tempSpoilDateGroup = [];
          tempDate = spoilDate;
        }
        tempSpoilDateGroup.push(tempSpoil);
      });
      tempSpoils.push(tempSpoilDateGroup);
      setSpoils(tempSpoils);
    });
};

export const getSpoilType = async name => {
  const spoilType = await firestore().doc(`spoilTypes/${name}`).get();
  return spoilType.data();
};

export const getAllSpoilTypes = async () => {
  const rawSpoilTypes = await firestore().collection(`spoilTypes`).get();
  let spoilTypes = [];
  rawSpoilTypes.forEach(rawSpoilType => spoilTypes.push(rawSpoilType.data()));
  return spoilTypes;
};
