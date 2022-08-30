const { Artist } = window;

/**
 * Deletes a single artist from the Artists collection
 * @param _id - The ID of the artist to delete.
 * @return A promise that resolves when the record is deleted
 */
export default async (_id: string) => {
  await Artist.deleteOne({ _id });
};
