import { faker } from "@faker-js/faker";
import { GENRES } from "../src/utils/constants";
import _ from "lodash";
import database from "./database.service";
import Artist from "./models/artist.model";

const MINIMUM_ARTISTS = 100;
const ARTISTS_TO_ADD = 15000;

const main = async () => {
  await database.connect("upstar_music");

  const count = await Artist.countDocuments();

  if (count < MINIMUM_ARTISTS) {
    const artists = _.times(ARTISTS_TO_ADD, () => createArtist());
    await Artist.insertMany(artists);
  }

  database.disconnect();
};

main();

const createArtist = () => ({
  name: faker.name.fullName(),
  age: randomBetween(15, 45),
  yearsActive: randomBetween(0, 15),
  image: faker.image.avatar(),
  genre: getGenre(),
  website: faker.internet.url(),
  netWorth: randomBetween(0, 5000000),
  labelName: faker.company.name(),
  retired: faker.datatype.boolean(),
  albums: getAlbums(),
});

const getAlbums = () =>
  _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99,
    };
  });

const getAlbumImage = (): string => {
  const types = _.keys(faker.image);

  const method = randomEntry(types);

  // @ts-ignore
  if (typeof faker.image[method] !== "function") return getAlbumImage();

  // @ts-ignore
  return faker.image[method]();
};

const getGenre = () => randomEntry(GENRES);

const randomEntry = (array: string[]) =>
  array[~~(Math.random() * array.length)];

const randomBetween = (min: number, max: number) =>
  ~~(Math.random() * (max - min)) + min;
