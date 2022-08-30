import { FilterQuery } from "mongoose";
import { IArtist } from "../models/artist.model";

const { Artist } = window;

interface IRange {
  min: number;
  max: number;
}

/**
 * Searches through the Artist collection
 * @param criteria An object with a name, age, and yearsActive
 * @param sortProperty The property to sort the results by
 * @param offset How many records to skip in the result set
 * @param limit How many records to return in the result set
 * @return A promise that resolves with the artists, count, offset, and limit
 */
const searchArtists = async (
  criteria: {
    name: string;
    age?: IRange;
    yearsActive?: IRange;
  },
  sortProperty: string,
  offset = 0,
  limit = 20
) => {
  const queryBuilder = {} as FilterQuery<IArtist>;

  if (criteria.name) {
    queryBuilder.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    queryBuilder.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max,
    };
  }

  if (criteria.yearsActive) {
    queryBuilder.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max,
    };
  }

  const artists = await Artist.find(queryBuilder)
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  const count = await Artist.find(queryBuilder).countDocuments();

  return { all: artists, count, offset, limit };
};

export default searchArtists;
