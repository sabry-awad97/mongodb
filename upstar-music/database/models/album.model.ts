import { Schema } from "mongoose";

export interface IAlbum {
  title: string;
  date: Date;
  copiesSold: number;
  numberTracks: number;
  image: string;
  revenue: number;
}

interface IAlbumSubDoc extends IAlbum, Document {}

const AlbumSchema = new Schema<IAlbumSubDoc>({
  title: String,
  date: Date,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number,
});

export default AlbumSchema;
