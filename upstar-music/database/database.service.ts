// External Dependencies
import mongoose from "mongoose";

class Database {
  connection = mongoose.connection;

  constructor() {
    try {
      this.connection
        .once("open", () => console.log("Database connection: open"))
        .on("close", () => console.log("Database connection: close"))
        .on("disconnected", () =>
          console.log("Database connection: disconnected")
        )
        .on("reconnected", () =>
          console.log("Database connection: reconnected")
        )
        .on("fullsetup", () => console.log("Database connection: fullsetup"))
        .on("all", () => console.log("Database connection: all"))
        .on("error", (error) =>
          console.error("MongoDB connection: error: ", error)
        );
    } catch (error) {
      console.error(error);
    }
  }

  async connect(dbName: string) {
    try {
      await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
    } catch (error) {
      console.error(error);
    }
  }

  async disconnect() {
    try {
      await this.connection.close();
    } catch (error) {
      console.error(error);
    }
  }

  getCollection(collection: string) {
    return this.connection.collections[collection];
  }
}

const database = new Database();

process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});

export default database;
