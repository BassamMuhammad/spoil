export const deleteAccount = async userId => {
  try {
    await auth().currentUser.delete();
    if (userId) await deleteUserData(userId);
    console.log('deleted');
  } catch (e) {
    console.log('not deleted', e);
  }
};
