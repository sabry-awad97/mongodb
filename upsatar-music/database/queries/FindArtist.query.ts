const { Artist } = window;

/**
 * Finds a single artist in the artist collection.
 * @param id - The ID of the record to find.
 * @return A promise that resolves with the Artist that matches the id
 */
const findOne = (id: string) => {
  return Artist.findById(id);
};

export default findOne;
