const {MongoClient} = require("mongodb");

// const uri = "mongodb://192.168.0.222:27017/?maxPoolSize=200";
const uri = process.env.MONGOURI || "mongodb://localhost:27017";

const client = new MongoClient(uri);
client.connect().then(async () => {
  console.log("connected db")
  let db = client.db("twitter")
  for (let i = 0; i < 1000; i++) {
    let user = {
      username: 'user_' + i,
      password: '123',
      nickname: 'user_' + i,
    }
    await db.collection("users").deleteMany({username: user.username})
    await db.collection("users").insertOne(user)
  }
})
