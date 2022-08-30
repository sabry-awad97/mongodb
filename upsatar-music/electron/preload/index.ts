import database from "../../database/database.service";
import Artist from "../../database/models/artist.model";

async function main() {
  await database.connect("upstar_music");
  window.Artist = Artist;
}

main();
