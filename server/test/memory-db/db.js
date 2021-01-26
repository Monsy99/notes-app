const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts).then(() => {
    console.log("mongoose connected to in-mem db");
  });
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close().then(() => {
    console.log("mongoose connection stopped");
  });
};
