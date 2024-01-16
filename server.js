const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
// API
const api = require('./app/api')
// DB
const db = require('./app/db')

// const MONGODB_URI = process.env.MONGODB_URI
// let db;


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(MONGODB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// async function run() {
//   try {
//     await client.connect();
//     await api.initializeDB(client);
//     db = client.db("epoll"); // database name
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// }

// run().catch(console.dir);

//Enable CORS
app.use(cors());

//Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// app.get('/polls', async (req, res) => {
//   try {
//     db = client.db("epoll");
//     const polls = await db.collection('polls').find().toArray();
//     res.json({ polls });
//   } catch (error) {
//     console.error('Error fetching polls:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Connect to the database
db.connectToDatabase()

// use API file
app.use('/api', api)

const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, () => {
  console.log("Server listening  port %s", port);
});