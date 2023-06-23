const dbString = "mongodb+srv://bigdata:chucha12npm nstall@bigdata.g7ngyy9.mongodb.net/?retryWrites=true&w=majority"

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(dbString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function getMongoClient() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    return client;
}

module.exports = {
    getMongoClient
}