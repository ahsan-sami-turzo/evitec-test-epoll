// packages for mongodb
const { MongoClient, ServerApiVersion } = require('mongodb')
// Import the dotenv module
const dotenv = require('dotenv').config()

let db;

async function connectToDatabase() {
    const MONGODB_URI = process.env.MONGODB_URI;
    const DATABASE_NAME = process.env.DATABASE_NAME;

    const client = new MongoClient(MONGODB_URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

    try {
        await client.connect();
        db = client.db("epoll"); 
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

// Ensure connection is established when this module is imported
connectToDatabase();

function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase() first.');
    }
    return db;
}

module.exports = {
    connectToDatabase,
    getDatabase,
};
