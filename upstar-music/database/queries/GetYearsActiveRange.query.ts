const { Artist } = window;

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
const getYearsActiveRange = async () => {
  const [min] = await Artist.find({}).sort({ yearsActive: 1 }).limit(1);
  const [max] = await Artist.find({}).sort({ yearsActive: -1 }).limit(1);

  return { min: min.yearsActive, max: max.yearsActive };
};

export default getYearsActiveRange;
