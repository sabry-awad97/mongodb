type IArtistProps = Record<"name" | "age" | "yearsActive" | "genre", string>;

const { Artist } = window;

/**
 * Edits a single artist in the Artists collection
 * @param _id - The ID of the artist to edit.
 * @param artistProps - An object with a name, age, yearsActive, and genre
 * @return A promise that resolves when the record is edited
 */
const editArtist = async (_id: string, artistProps: IArtistProps) => {
  await Artist.updateOne({ _id }, artistProps);
};

export default editArtist;
