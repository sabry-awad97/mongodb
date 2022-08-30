const { Artist } = window;

/**
 * Sets a group of Artists as not retired
 * @param ids - An array of the _id's of of artists to update
 * @return A promise that resolves after the update
 */
const setNotRetired = async (ids: string[]) => {
  await Artist.updateMany({ _id: { $in: ids } }, { retired: false });
};

export default setNotRetired;
