const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
// packages for mongodb
const { MongoClient, ServerApiVersion } = require('mongodb')
// Import the dotenv module
const dotenv = require('dotenv').config()



console.log()




// mongo connection
const uri = process.env.MONGODB_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// mongo connection ends


//Enable CORS
app.use(cors());

const polls = [
  {
    id: 1,
    title: 'What is your favorite drink?',
    options: [
      { id: 1, title: 'Tea', votes: 0 },
      { id: 2, title: 'Coffee', votes: 0 },
      { id: 3, title: 'Cola', votes: 0 },
      { id: 4, title: 'Beer', votes: 0 }
    ]
  },
  {
    id: 2,
    title: 'Is this a cool question?',
    options: [
      { id: 1, title: 'Yes', votes: 0 },
      { id: 2, title: 'No', votes: 0 },
      { id: 3, title: 'Cool, another option', votes: 0 }
    ]
  }
];

//Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/polls', (req, res) => {
  let result = {
    polls: polls.map(function (p) {
      return { id: p.id, title: p.title };
    })
  };
  res.json(result);
});


app.get('/polls/:id', (req, res) => {
  let id = req.params.id - 1;
  res.json(polls[id]);
});

app.post('/polls/:id/vote/:option', (req, res) => {
  var poll = polls[req.params.id - 1];
  poll.options[req.params.option - 1].votes++;
  res.json(poll);
});

app.post('/polls/add', (req, res) => {
  var poll = {
    id: (polls.length + 1),
    title: req.body.title,
    options: []
  }

  req.body.options.forEach(opt => {
    poll.options.push({ id: poll.options.length + 1, title: opt, votes: 0 });
  });

  polls.push(poll);
  res.json(poll);
});

const port = process.env.PORT ? process.env.PORT : 8081;
const server = app.listen(port, () => {
  console.log("Server listening  port %s", port);
});