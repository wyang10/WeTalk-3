const {MongoClient} = require("mongodb");

const uri = process.env.MONGOURI || "mongodb://localhost:27017/?maxPoolSize=200";

const client = new MongoClient(uri);
client.connect().then(() => {
  console.log("connected db")
})

function getDB() {
  return client.db("twitter")
}

module.exports = {getDB}
