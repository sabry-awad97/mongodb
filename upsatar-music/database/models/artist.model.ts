import { model, Schema, Document, Model, Types } from "mongoose";
import AlbumSchema, { IAlbum } from "./album.model";

export interface IArtist {
  name: string;
  age: number;
  yearsActive: number;
  image: string;
  genre: string;
  website: string;
  netWorth: number;
  labelName: string;
  retired: boolean;
  albums: Types.DocumentArray<IAlbum>;
}

interface IArtistDoc extends IArtist, Document {}

export interface IArtistModel extends Model<IArtist> {}

const ArtistSchema = new Schema<IArtist>({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema],
});

const Artist = model<IArtistDoc, IArtistModel>("Artist", ArtistSchema);

export default Artist;
