type IArtistProps = Record<"name" | "age" | "yearsActive" | "genre", string>;

const { Artist } = window;

/**
 * Finds a single artist in the artist collection.
 * @param artistProps - Object containing a name, age, yearsActive, and genre
 * @return A promise that resolves with the Artist that was created
 */
const createdArtist = (artistProps: Partial<IArtistProps>) => {
  const artist = new Artist(artistProps);
  return artist.save();
};

export default createdArtist;
