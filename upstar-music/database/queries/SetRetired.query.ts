const { Artist } = window;

/**
 * Sets a group of Artists as retired
 * @param ids - An array of the _id's of of artists to update
 * @return  A promise that resolves after the update
 */
const setRetired = async (ids: Array<string>) => {
  await Artist.updateMany({ _id: { $in: ids } }, { retired: true });
};

export default setRetired;
