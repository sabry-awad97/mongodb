const { Artist } = window;

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
const getAgeRange = async (): Promise<{ min: number; max: number }> => {
  const [min] = await Artist.find({}).sort({ age: 1 }).limit(1);
  const [max] = await Artist.find({}).sort({ age: -1 }).limit(1);

  return { min: min.age, max: max.age };
};

export default getAgeRange;
