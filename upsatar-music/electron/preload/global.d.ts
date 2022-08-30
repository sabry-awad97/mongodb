import { IArtistModel } from "../../database/models/artist.model";

declare global {
  interface Window {
    Artist: IArtistModel;
  }
}
